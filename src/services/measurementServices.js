const db = require("../model/index");

// Including models
const { Measurement } = db.sequelize.models;

// including constant file
const CONSTANTS = require('../shared/constants');

//Get measurement service
const getMeasurement = async(req, res) => {
    let measurementData = await Measurement.findAll();

    return { status: 200, data: measurementData };
}

module.exports = {
    getMeasurement,
};