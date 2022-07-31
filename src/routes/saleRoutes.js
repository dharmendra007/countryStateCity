const express = require("express");
const { body } = require('express-validator');
const saleRoutes = express.Router();

const saleController = require('../controller/saleController');
const authService = require("../shared/auth.service");

const db = require("../model/index");

//Add Stock detals
saleRoutes.post('/addSale', [
    body("branch_id").isNumeric()
    .withMessage('Invalid branch id'),
    body("sales_type_id").isNumeric()
    .withMessage('Invalid Sales type id'),
], authService.validateToken, saleController.addSale);

// Get Stock details
saleRoutes.post('/getSale', authService.validateToken, saleController.getSale);

module.exports = saleRoutes;