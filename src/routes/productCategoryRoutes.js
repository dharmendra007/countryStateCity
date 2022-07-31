const express = require("express");
const { body } = require('express-validator');
const productCategoryRoutes = express.Router();

const productCategoryController = require('../controller/productCategoryController');
const authService = require("../shared/auth.service");

const db = require("../model/index");

// Get ProductCategory details
productCategoryRoutes.get('/getProductCategory', authService.validateToken, productCategoryController.getProductCategory);

module.exports = productCategoryRoutes;