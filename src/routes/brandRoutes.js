const express = require("express");
const { body } = require('express-validator');
const brandRoutes = express.Router();

const brandController = require('../controller/brandController');
const authService = require("../shared/auth.service");

const db = require("../model/index");

// Get Brand details
brandRoutes.get('/getBrand', authService.validateToken, brandController.getBrand);

module.exports = brandRoutes;