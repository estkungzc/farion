const express = require('express');

const router = express.Router();
const LoraiotController = require('../../controllers/loraiot');

// @route    POST api/iot-receiver/
// @desc     Store the sensor value
router.post("/iot-receiver", LoraiotController.store);

// @route    GET api/iot-received.
// @desc     Retrieve all data
router.get("/iot-received", LoraiotController.get);

// @route    GET api/sensor.
// @desc     Retrieve all data
router.get("/sensor", LoraiotController.getSensor);

module.exports = router;