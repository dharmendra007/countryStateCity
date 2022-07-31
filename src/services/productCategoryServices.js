const db = require("../model/index");

// Including models
const { ProductCategory } = db.sequelize.models;

// including constant file
const CONSTANTS = require('../shared/constants');

//Get produtCategory service
const getProductCategory = async(req, res) => {
    let produtCategoryData = await ProductCategory.findAll();

    return { status: 200, data: produtCategoryData };
}

module.exports = {
    getProductCategory,
};