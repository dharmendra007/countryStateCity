const db = require("../model/index");

// Including models
const { Branch } = db.sequelize.models;

// including constant file
const CONSTANTS = require('../shared/constants');


//Add branch service
const addBranch = async(req, res) => {
    // let branchData = await Branch.findAll();

    // return { status: 200, data: branchData };
}

//Get branch service
const getBranch = async(req, res) => {
    let branchData = await Branch.findAll();

    return { status: 200, data: branchData };
}

module.exports = {
    addBranch,
    getBranch
};