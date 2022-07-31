const brandService = require("../services/brandServices");
const CONSTANTS = require("../shared/constants");
const logger = require('../logger/logger');

// Get brand API
const getBrand = async(req, res) => {
    // Call sale Service
    let getBrand = await brandService.getBrand(req.body);
    if (getBrand.status === CONSTANTS.ERROR) {
        logger.error(getBrand.message);
        return res.status(401).json({ msg: getBrand.message });
    } else if (getBrand.status == 200) {
        logger.info(CONSTANTS.FETCHED);
        return res.status(200).json({ msg: CONSTANTS.FETCHED, data: getBrand.data });
    } else {
        logger.error(CONSTANTS.SOMETHING_WRONG);
        return res.status(401).json({ msg: CONSTANTS.SOMETHING_WRONG });
    }
}

module.exports = {
    getBrand
}