const Sensor = require('../models/sensor');
const moment = require('moment');
moment.locale('th');

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