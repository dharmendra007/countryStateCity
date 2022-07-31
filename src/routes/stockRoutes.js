const express = require("express");
const { body } = require('express-validator');
const stockRoutes = express.Router();

const stockController = require('../controller/stockController');
const authService = require("../shared/auth.service");

const db = require("../model/index");

//Add Stock detals
stockRoutes.post('/addStock', [
    body("branch_id").isNumeric()
    .withMessage('Invalid branch id')
], authService.validateToken, stockController.addStock);

// Get Stock details
stockRoutes.post('/getStock/:start/:end', authService.validateToken, stockController.getStock);

// Get Remaining Stock details
stockRoutes.post('/getRemainingStock', authService.validateToken, stockController.getRemainingStock);

module.exports = stockRoutes;