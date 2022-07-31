const { Result } = require('express-validator');
const jwt = require('jsonwebtoken');
const CONSTANTS = require('./constants');
//generation of token
const generateToken = payload => {
        const option = {
            expiresIn: CONSTANTS.JWT_TOKEN_EXPIRY,
            issuer: CONSTANTS.JWT_ISSUER
        }

        const token = jwt.sign(payload, CONSTANTS.JWT_SECRET_KEY, option);
        return token;
    }
    //validatation of token 
const validateToken = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken) {
        const token = authToken.split(' ')[1];
        const option = {
            expiresIn: CONSTANTS.JWT_TOKEN_EXPIRY,
            issuer: CONSTANTS.JWT_ISSUER
        }
        try {
            result = jwt.verify(token, CONSTANTS.JWT_SECRET_KEY, option);
            res.locals.user = result;
            userRoleId = result.user[0].role_id;
            userId = result.user[0].id;
            next();
        } catch (err) {
            return res.status(401).json({ "Error": "invalid token or token expired" });
        }
    } else {
        return res.status(401).json({ "Error": "No Authtoken found" });
    }
}
module.exports = {
    generateToken,
    validateToken
}