const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sensorSchema = new Schema({
  pm25: {
    type: Number,
    required: true
  },
  location: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  },
  time: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sensor', sensorSchema);
