const stockService = require("../services/stockServices");
const CONSTANTS = require("../shared/constants");
const { validationResult } = require('express-validator');
const logger = require('../logger/logger');

// Add stock API
const addStock = async(req, res) => {
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
                // Call stock Service
                let addStock = await stockService.addStock(req.body);
                if (addStock.status === CONSTANTS.ERROR) {
                    logger.error(addStock.message);
                    return res.status(401).json({ msg: addStock.message });
                } else if (addStock.status == 200) {
                    logger.info(CONSTANTS.STOCK_ADDED);
                    return res.status(200).json({ msg: CONSTANTS.STOCK_ADDED });
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


// Get stock API
const getStock = async(req, res) => {
    // Check user role validation
    if (userRoleId == CONSTANTS.ADMIN || userRoleId == CONSTANTS.USER) {
        // Call stock Service
        let getStock = await stockService.getStock(req.body, req.params);
        if (getStock.status === CONSTANTS.ERROR) {
            logger.error(getStock.message);
            return res.status(401).json({ msg: getStock.message });
        } else if (getStock.status == 200) {
            logger.info(CONSTANTS.FETCHED);
            return res.status(200).json({ msg: CONSTANTS.FETCHED, data: getStock.data, dataTable: getStock.dataTable });
        } else {
            logger.error(CONSTANTS.SOMETHING_WRONG);
            return res.status(401).json({ msg: CONSTANTS.SOMETHING_WRONG });
        }
    } else {
        logger.error(CONSTANTS.NOT_ACCESS);
        return res.status(401).json({ msg: CONSTANTS.NOT_ACCESS });
    }
}


// Get stock API
const getRemainingStock = async(req, res) => {
    // Check user role validation
    if (userRoleId == CONSTANTS.ADMIN || userRoleId == CONSTANTS.USER) {
        // Call stock Service
        let getRemainingStock = await stockService.getRemainingStock(req.body);
        if (getRemainingStock.status === CONSTANTS.ERROR) {
            logger.error(getRemainingStock.message);
            return res.status(401).json({ msg: getRemainingStock.message });
        } else if (getRemainingStock.status == 200) {
            logger.info(CONSTANTS.FETCHED);
            return res.status(200).json({ msg: CONSTANTS.FETCHED, data: getRemainingStock.data });
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
    addStock,
    getStock,
    getRemainingStock
}