const branchService = require("../services/branchServices");
const CONSTANTS = require("../shared/constants");
const { validationResult } = require('express-validator');
const logger = require('../logger/logger');

// Add branchAPI
const addBranch = async(req, res) => {
    try {
        const error = validationResult(req);
        // validate the sent request
        if (!error.isEmpty()) {
            //if their are errors in the request print the errors
            logger.error(error);
            return res.status(401).json({ "Error": error });
        } else {
            // Check user role validation
            if (userRoleId == CONSTANTS.ADMIN) {
                // Call branchService
                let addBranch = await branchService.addBranch(req.body);
                if (addBranch.status === CONSTANTS.ERROR) {
                    logger.error(addBranch.message);
                    return res.status(401).json({ msg: addBranch.message });
                } else if (addBranch.status == 200) {
                    logger.info(CONSTANTS.BRANCH_ADDED);
                    return res.status(200).json({ msg: CONSTANTS.BRANCH_ADDED });
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


// Get branchAPI
const getBranch = async(req, res) => {
    // Check user role validation
    if (userRoleId == CONSTANTS.ADMIN || userRoleId == CONSTANTS.USER) {
        // Call branchService
        let getBranch = await branchService.getBranch(req.body);
        if (getBranch.status === CONSTANTS.ERROR) {
            logger.error(getBranch.message);
            return res.status(401).json({ msg: getBranch.message });
        } else if (getBranch.status == 200) {
            logger.info(CONSTANTS.FETCHED);
            return res.status(200).json({ msg: CONSTANTS.FETCHED, data: getBranch.data });
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
    addBranch,
    getBranch
}