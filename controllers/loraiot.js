const Sensor = require('../models/sensor');
const moment = require('moment');
moment.locale('th');

const axios = require('axios');
// const url = 'https://loraiot-tgr2020.firebaseio.com/quiz';
const url = 'https://tgr2020-quiz2.firebaseio.com/quiz'
const destUrl = 'team27.json';
var Parser = require('binary-parser').Parser;

exports.store = (req, res, next) => {
	const now = moment().utcOffset(7).format();
	console.log(now);
	const sensor = new Sensor({
		pm25: req.body.pm25,
		location: req.body.location,
		time: now
	});
	sensor
    .save()
    .then(result => {
	  console.log(result);
	  res.json({data: req.body, message: 'Store data successfully'});
    //   res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.get = async (req, res, next) => {
	Sensor.find()
    .then(s => {
      res.json(s);
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getSensor = async (req, res, next) => {
  // Parcer Unsigned 8-bit integer
  const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length
  var parser = new Parser().int8('team').int8('pm25');

  let resultSensor;
  const parseBufArr = [];
  try {
    resultSensor = await axios.get(`${url}/sensor/${destUrl}`);
    const d = resultSensor.data;
    for (var key in d) {
      const buf = Buffer.from(d[key]['payload_hex'], 'hex');
      const parseBuf = parser.parse(buf);
      parseBufArr.push(parseBuf);
    }
  } catch (error) {
    res.json({ message: error });
  }
  let resultLoc;
  const locArr = [];
  try {
    resultLoc = await axios.get(`${url}/location/${destUrl}`);
    const d = resultLoc.data;
    for (var key in d) {
      locArr.push(d[key]);
    }
  } catch (error) {
    res.json({ message: error });
  }

  const uniqueLocLastedVal = {};
  const locPm25valAndCount = {};
  const allPm25ValandTimestamp = [];
  const allPm25val = [];
  for (let index = 0; index < parseBufArr.length; index++) {
    const loc = locArr[index];
    const sensor = {
      ...parseBufArr[index], 
      timestamp: loc.timestamp, 
      lat: parseFloat(loc.latitude), 
      long: parseFloat(loc.longitude)
    };
    
    allPm25val.push(sensor.pm25);
    allPm25ValandTimestamp.push({pm25: sensor.pm25, timestamp: sensor.timestamp})

    const currentLoc = [sensor.lat, sensor.long].toString();

    if (currentLoc in locPm25valAndCount) {
      locPm25valAndCount[currentLoc]['pm25'].push(sensor.pm25);
      locPm25valAndCount[currentLoc]['count']++;
    } else {
      locPm25valAndCount[currentLoc] = {pm25: [sensor.pm25], count: 1};
    }
    
    const locWithOutTeamAndTime = [parseFloat(loc.latitude), parseFloat(loc.longitude)];
    // console.log(locWithOutTeamAndTime)
    uniqueLocLastedVal[locWithOutTeamAndTime] = sensor;
    
  }

  const sensorData = {
     maxPm25: Math.max(...allPm25val),
     minPm25: Math.min(...allPm25val),
     avgPm25: arrAvg(allPm25val),
     pm25data: allPm25ValandTimestamp
  };

  const locData = [];
  const filteredMergeArr = [];
  const uniqueLocKey = Object.keys(uniqueLocLastedVal);
  for (let index = 0; index < uniqueLocKey.length; index++) {
    const currentUniqueLocLastedVal = uniqueLocLastedVal[uniqueLocKey[index]];
    const filteredMerge = {
      avgPm25: arrAvg(locPm25valAndCount[uniqueLocKey[index]].pm25),
      lat: currentUniqueLocLastedVal.lat,
      long: currentUniqueLocLastedVal.long,
      lastedTimestamp: currentUniqueLocLastedVal.timestamp,
      lastedPm25: currentUniqueLocLastedVal.pm25
    };
    filteredMergeArr.push(filteredMerge)
    locData.push({
      lat: currentUniqueLocLastedVal.lat,
      long: currentUniqueLocLastedVal.long,
      count: locPm25valAndCount[uniqueLocKey[index]].count
    })
  }
  const sortedLocData = locData.sort(function(a,b) {
    return b.count - a.count
  });
  res.json({ sensorData: sensorData, locData: sortedLocData, sensorLocData: filteredMergeArr });
}