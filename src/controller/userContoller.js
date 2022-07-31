const userService = require("../services/userServices");
const CONSTANTS = require("../shared/constants");
const authService = require("../shared/auth.service");
const { validationResult } = require('express-validator');
const logger = require('../logger/logger');

//call back function to authenticate users
const login = async(req, res) => {
    const error = validationResult(req);
    // validate the sent request
    if (!error.isEmpty()) {
        //if their are errors in the request print the errors
        return res.status(401).json({ "Error": error });
    }
    let user;
    try {
        user = await userService.login(req.body);
    } catch (err) {
        logger.error(err);
        return res.status(500).json({ msg: CONSTANTS.SOME_ERROR, error: err.message });
    }

    //to verify if the returned data is null or not
    user = JSON.parse(JSON.stringify(user));
    if (user.length === 0) {
        //if null then returns 401 error
        logger.error(CONSTANTS.INVALID_CRED);
        return res.status(401).json({ msg: CONSTANTS.INVALID_CRED });
    } else if (user[0].status == 0) {
        logger.error(CONSTANTS.USER_DEACTIVATED);
        return res.status(401).json({ msg: CONSTANTS.USER_DEACTIVATED });
    }
    //else generates the token for authenticated user
    else {
        const payload = {
            user
        };
        var data = payload.user[0]
        delete data['password']; //deletes the password data before generating token
        const jwtToken = authService.generateToken(payload);

        res.setHeader(
            CONSTANTS.JWT_HEADER_STRING,
            `${CONSTANTS.JWT_TOKEN_PREFIX} ${jwtToken}`
        );
        return res.status(200).json({ token: jwtToken });
    }
};

// Registration API
const register = async(req, res) => {
    const error = validationResult(req);
    // validate the sent request
    if (!error.isEmpty()) {
        //if their are errors in the request print the errors
        logger.error(error);
        return res.status(401).json({ "Error": error });
    }

    // Check user_branches should have atlest one value
    if (!req.body.user_branches.length) {
        logger.error(CONSTANTS.USER_BRANCH_NOT_EMPTY);
        return res.status(401).json({ "Error": CONSTANTS.USER_BRANCH_NOT_EMPTY });
    } else {
        //Call servie file to add user
        let registerUser = await userService.register(req.body);
        if (registerUser.status === CONSTANTS.ERROR) {
            logger.error(CONSTANTS.INVALID_CRED);
            return res.status(401).json({ msg: registerUser.message });
        } else if (registerUser.status == 200) {
            logger.info(CONSTANTS.USER_REGISTRED);
            return res.status(200).json({ msg: CONSTANTS.USER_REGISTRED });
        } else {
            logger.error(CONSTANTS.SOMETHING_WRONG);
            return res.status(401).json({ msg: CONSTANTS.SOMETHING_WRONG });
        }
    }
}

module.exports = {
    login,
    register
}