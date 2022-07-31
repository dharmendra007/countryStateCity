const saleService = require("../services/saleServices");
const CONSTANTS = require("../shared/constants");
const { validationResult } = require('express-validator');
const logger = require('../logger/logger');

// Add sale API
const addSale = async(req, res) => {
    try {
        const error = validationResult(req);
        // validate the sent request
        if (!error.isEmpty()) {
            //if their are errors in the request print the errors
            logger.error(error);
            return res.status(401).json({ "Error": error });
        } else {
            // Check user role validation
            if (userRoleId == CONSTANTS.ADMIN || userRoleId == CONSTANTS.USER) {
                // Call sale Service
                let addSale = await saleService.addSale(req.body);
                if (addSale.status === CONSTANTS.ERROR) {
                    logger.error(addSale.message);
                    return res.status(401).json({ msg: addSale.message });
                } else if (addSale.status == 200) {
                    logger.info(CONSTANTS.ITEM_SOLD);
                    return res.status(200).json({ msg: CONSTANTS.ITEM_SOLD });
                } else {
                    logger.error(CONSTANTS.SOMETHING_WRONG);
                    return res.status(401).json({ msg: CONSTANTS.SOMETHING_WRONG });
                }
            } else {
                logger.error(CONSTANTS.NOT_ACCESS);
                return res.status(401).json({ msg: CONSTANTS.NOT_ACCESS });
            }
        }
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: CONSTANTS.SOME_ERROR, error: err.message });
    }
}


// Get sale API
const getSale = async(req, res) => {
    // Check user role validation
    if (userRoleId == CONSTANTS.ADMIN || userRoleId == CONSTANTS.USER) {
        // Call sale Service
        let getSale = await saleService.getSale(req.body);
        if (getSale.status === CONSTANTS.ERROR) {
            logger.error(getSale.message);
            return res.status(401).json({ msg: getSale.message });
        } else if (getSale.status == 200) {
            logger.info(CONSTANTS.FETCHED);
            return res.status(200).json({ msg: CONSTANTS.FETCHED, data: getSale.data });
        } else {
            logger.error(CONSTANTS.SOMETHING_WRONG);
            return res.status(401).json({ msg: CONSTANTS.SOMETHING_WRONG });
        }
    } else {
        logger.error(CONSTANTS.NOT_ACCESS);
        return res.status(401).json({ msg: CONSTANTS.NOT_ACCESS });
    }
}

module.exports = {
    addSale,
    getSale
}