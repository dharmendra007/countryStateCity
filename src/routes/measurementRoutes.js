const express = require("express");
const { body } = require('express-validator');
const measurementRoutes = express.Router();

const measurementController = require('../controller/measurementController');
const authService = require("../shared/auth.service");

const db = require("../model/index");

// Get Measurement details
measurementRoutes.get('/getMeasurement', authService.validateToken, measurementController.getMeasurement);

module.exports = measurementRoutes;