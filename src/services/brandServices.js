const db = require("../model/index");

// Including models
const { Brand } = db.sequelize.models;

// including constant file
const CONSTANTS = require('../shared/constants');

//Get brand service
const getBrand = async(req, res) => {
    let brandData = await Brand.findAll();

    return { status: 200, data: brandData };
}

module.exports = {
    getBrand,
};