const express = require("express");
const { body } = require('express-validator');
const branchRoutes = express.Router();

const branchController = require('../controller/branchController');
const authService = require("../shared/auth.service");

const db = require("../model/index");

// Add Branch
branchRoutes.post('/addBranch', [
        body("branch_name").isAlpha()
        .withMessage('Invalid Branch Name'),
        body("address").isAlpha()
        .withMessage("Invalid Address"),
        body("city_name").isAlpha()
        .withMessage("Invalid City Name")
    ],
    authService.validateToken, branchController.addBranch);
// Get Branch details
branchRoutes.get('/getBranch', authService.validateToken, branchController.getBranch);

module.exports = branchRoutes;