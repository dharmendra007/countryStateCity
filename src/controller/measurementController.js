const measurementService = require("../services/measurementServices");
const CONSTANTS = require("../shared/constants");
const logger = require('../logger/logger');

// Get measurement API
const getMeasurement = async(req, res) => {
    // Call sale Service
    let getMeasurement = await measurementService.getMeasurement(req.body);
    if (getMeasurement.status === CONSTANTS.ERROR) {
        logger.error(getMeasurement.message);
        return res.status(401).json({ msg: getMeasurement.message });
    } else if (getMeasurement.status == 200) {
        logger.info(CONSTANTS.FETCHED);
        return res.status(200).json({ msg: CONSTANTS.FETCHED, data: getMeasurement.data });
    } else {
        logger.error(CONSTANTS.SOMETHING_WRONG);
        return res.status(401).json({ msg: CONSTANTS.SOMETHING_WRONG });
    }
}

module.exports = {
    getMeasurement
}