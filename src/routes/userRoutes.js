const express = require("express");
const { body } = require('express-validator');
const userRoutes = express.Router();

const userController = require('../controller/userContoller');
const authService = require("../shared/auth.service");

//post method for login
userRoutes.post('/login', [
    body("email").isEmail()
    .withMessage('Invalid email'),
    body("password").isLength({ min: 1 })
    .withMessage("Password is ")
], userController.login);

//post method for register
userRoutes.post('/register', [
    body("email").isEmail()
    .withMessage('Invalid email'),
    body("password").isLength({ min: 8 })
    .withMessage("Password should be 8 characters long")
    .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/,
    )
    .withMessage("Password should be 8 characters long, combination of atlest one capital letter, one capital letter, one digit and one special character "),
    body("first_name").isAlphanumeric()
    .withMessage("First Name is required"),
    body("last_name").isAlphanumeric()
    .withMessage("Last Name is required")
], authService.validateToken, userController.register);


module.exports = userRoutes;