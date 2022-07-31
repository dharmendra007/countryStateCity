const db = require("../model/index");

// Including models
const { Users, Brand, ProductCategory, Measurement, Branch, UserBranch, Stock, RemainingStock } = db.sequelize.models;

// including constant file
const CONSTANTS = require('../shared/constants');

//Add stock service
const addStock = async(req, res) => {
    const created_by = userId;
    const branch_id = req.branch_id;
    const stocks = req.stock;

    try {
        let flag = false;
        let errorMsg = '';

        //Check if branch_id is on record or not
        let branchExist = await Branch.findAll({
            where: {
                id: branch_id
            }
        });
        if (!branchExist.length) {
            flag = true;
            errorMsg = CONSTANTS.BRANCH_NOT_EXIST;
        }

        //Check if admin cis assign to given branch id or not
        let userAccessToBranch = await UserBranch.findAll({
            where: {
                user_id: userId,
                branch_id: branch_id
            }
        });
        if (!userAccessToBranch.length && flag == false) {
            flag = true;
            errorMsg = CONSTANTS.NOT_ADMIN_OF_SELECTED_BRANCH;
        }

        if (flag == true) {
            return { status: "error", message: errorMsg };
        } else {
            for (var stock = 0; stock < stocks.length; stock++) {
                const brand_id = stocks[stock].brand_id;
                const product_category_id = stocks[stock].product_category_id;
                const measurement_id = stocks[stock].measurement_id;
                const quantity = stocks[stock].quantity;
                const unit_price = stocks[stock].unit_price;

                if (!brand_id) {
                    flag = true;
                    errorMsg = CONSTANTS.BRAND_REQUIRED;
                }
                if (!product_category_id && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.PRODUCT_CATEGORY_REQUIRED;
                }
                if (!measurement_id && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.MEASUREMENT_REQUIRED;
                }
                if (!quantity && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.QUANTITY_REQUIRED;
                }
                if (!unit_price && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.UNIT_PRICE_REQUIRED;
                }

                //Check if brand_id is on record or not
                let brandExist = await Brand.findAll({
                    where: {
                        id: brand_id
                    }
                });
                if (!brandExist.length && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.BRAND_NOT_EXIST;
                }

                //Check if product_category_id is on record or not
                let productCategoryExist = await ProductCategory.findAll({
                    where: {
                        id: product_category_id
                    }
                });
                if (!productCategoryExist.length && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.PRODUCT_CATEGORY_NOT_EXIST;
                }

                //Check if measurement_id is on record or not
                let measurementExist = await Measurement.findAll({
                    where: {
                        id: measurement_id
                    }
                });
                if (!measurementExist.length && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.MEASUREMENT_NOT_EXIST;
                }

                if (flag == true) {
                    return { status: "error", message: errorMsg + " for stock number " + (stock + 1) };
                }

                if ((stock + 1) == stocks.length) {
                    if (flag == false) {
                        for (var stock = 0; stock < stocks.length; stock++) {
                            const brand_id = stocks[stock].brand_id;
                            const product_category_id = stocks[stock].product_category_id;
                            const measurement_id = stocks[stock].measurement_id;
                            const quantity = stocks[stock].quantity;
                            const unit_price = stocks[stock].unit_price;

                            // // if flag is true then respond back with error otherwise add new stock
                            if (flag == true) {
                                return { status: "error", message: CONSTANTS.SOMETHING_WRONG };
                            } else {
                                let stock = {
                                    created_by,
                                    brand_id,
                                    product_category_id,
                                    measurement_id,
                                    quantity,
                                    unit_price,
                                    branch_id
                                };
                                // Add Data into stock table
                                let addStock = Stock.create(stock);

                                // Get RemainingStock data
                                let stockExist = await RemainingStock.findAll({
                                    attribute: ['stock_remaining'],
                                    where: {
                                        brand_id,
                                        product_category_id,
                                        measurement_id,
                                        branch_id
                                    },
                                    raw: true,
                                });

                                // Count RemainingStock and update it in remaining_stock table
                                if (!stockExist.length) {
                                    //Add stock 
                                    let remainingStock = {
                                        stock_remaining: quantity,
                                        brand_id: brand_id,
                                        product_category_id: product_category_id,
                                        measurement_id: measurement_id,
                                        branch_id: branch_id
                                    }
                                    await RemainingStock.create(remainingStock);
                                } else {
                                    // Update stock
                                    let newQuantity = quantity + stockExist[0].stock_remaining;
                                    let remainingStock = {
                                        stock_remaining: newQuantity
                                    }
                                    await RemainingStock.update(remainingStock, {
                                        where: {
                                            brand_id,
                                            product_category_id,
                                            measurement_id,
                                            branch_id
                                        }
                                    });
                                }
                            }
                            // Respond back with success message
                            if ((stock + 1) == stocks.length) {
                                return { status: 200, data: addStock };
                            }
                        }
                    }

                }
            }
        }
    } catch (err) {
        console.log(err)
        return { status: "error", message: err.message };
    }
}

//Get stock service
const getStock = async(req, param) => {
    const created_by = userId;
    const brand_id = req.brand_id ? req.brand_id : 0;
    const product_category_id = req.product_category_id ? req.product_category_id : 0;
    const measurement_id = req.measurement_id ? req.measurement_id : 0;
    const branch_id = req.branch_id;
    const from_date = req.from_date;
    const to_date = req.to_date;

    try {
        let flag = false;
        let errorMsg = '';
        // Check if brand id is on record or not
        let brandExist = await Brand.findAll({
            where: {
                id: brand_id
            }
        });
        if (!brandExist.length && brand_id) {
            flag = true;
            errorMsg = CONSTANTS.BRAND_NOT_EXIST;
        }

        //Check if product_category_id is on record or not
        let productCategoryExist = await ProductCategory.findAll({
            where: {
                id: product_category_id
            }
        });
        if (!productCategoryExist.length && flag == false && product_category_id) {
            flag = true;
            errorMsg = CONSTANTS.PRODUCT_CATEGORY_NOT_EXIST;
        }

        //Check if measurement_id is on record or not
        let measurementExist = await Measurement.findAll({
            where: {
                id: measurement_id
            }
        });
        if (!measurementExist.length && flag == false && measurement_id) {
            flag = true;
            errorMsg = CONSTANTS.MEASUREMENT_NOT_EXIST;
        }

        // Check if branch id is exist or not for admin
        if (!branch_id && userRoleId == CONSTANTS.ADMIN) {
            flag = true;
            errorMsg = CONSTANTS.BRANCH_REQUIRED;
        }

        //Check if branch_id is on record or not
        let branchExist = await Branch.findAll({
            where: {
                id: branch_id
            }
        });
        if (!branchExist.length && flag == false && userRoleId == CONSTANTS.ADMIN) {
            flag = true;
            errorMsg = CONSTANTS.BRANCH_NOT_EXIST;
        }

        //Check if admin is assign to given branch id or not
        let userAccessToBranch = await UserBranch.findAll({
            where: {
                user_id: userId,
                branch_id: branch_id
            }
        });
        if (!userAccessToBranch.length && flag == false && userRoleId == CONSTANTS.ADMIN) {
            flag = true;
            errorMsg = "You are not an admin of selected branch";
        }

        // if flag is true then respond back with error otherwise add new stock
        if (flag == true) {
            return { status: "error", message: errorMsg };
        } else {
            let flag = false;

            let getStockQuery = 'select stocks.*,brands.brand_name,product_categories.product_category_name,measurements.measurement,branches.branch_name,branches.Address,users.email,users.first_name,users.last_name from stocks join brands on stocks.brand_id=brands.id join product_categories on stocks.product_category_id=product_categories.id join measurements on stocks.measurement_id=measurements.id join branches on stocks.branch_id=branches.id join users on stocks.created_by=users.id where ';

            if (brand_id) {
                getStockQuery += "stocks.brand_id=(:brandid) and ";
            }
            if (product_category_id) {
                getStockQuery += "stocks.product_category_id=(:productcategoryid) and ";
            }
            if (measurement_id) {
                getStockQuery += "stocks.measurement_id=(:measurementid) and ";
            }
            if (branch_id) {
                getStockQuery += "stocks.branch_id=(:branchid) and ";
            }
            if (from_date) {
                if (to_date) {
                    getStockQuery += "DATE(stocks.created_at) >= (:fromdate) and DATE(stocks.created_at) <= (:todate) and ";
                } else {
                    getStockQuery += "DATE(stocks.created_at)=(:fromdate) and ";
                }
            }

            getStockQuery += "1=1 ORDER BY brands.brand_name";

            // Get stock total length
            let stockData = await db.sequelize.query(
                getStockQuery, {
                    replacements: {
                        brandid: brand_id,
                        productcategoryid: product_category_id,
                        measurementid: measurement_id,
                        branchid: branch_id,
                        fromdate: from_date,
                        todate: to_date
                    },
                    type: db.sequelize.QueryTypes.SELECT,
                }
            );

            let start = parseInt(param.start) ? parseInt(param.start) : 1;
            let end = parseInt(param.end) ? parseInt(param.end) : stockData.length;

            if (stockData.length) {
                // Get stock total length by limit
                let newStart = start - 1;
                getStockQuery += " limit " + newStart + "," + end;
                let stockDataLimit = await db.sequelize.query(
                    getStockQuery, {
                        replacements: {
                            brandid: brand_id,
                            productcategoryid: product_category_id,
                            measurementid: measurement_id,
                            branchid: branch_id,
                            fromdate: from_date,
                            todate: to_date
                        },
                        type: db.sequelize.QueryTypes.SELECT,
                    }
                );
                dataTable = { start: start, end: newStart + stockDataLimit.length, total: stockData.length };
                return { status: 200, data: stockDataLimit, dataTable: dataTable };
            } else
                return { status: 200, data: CONSTANTS.NOT_FOUND };
        }
    } catch (err) {
        console.log(err)
        return { status: "error", message: err.message };
    }
}



//Get Remaining stock service
const getRemainingStock = async(req, res) => {
    const created_by = userId;
    const brand_id = req.brand_id ? req.brand_id : 0;
    const product_category_id = req.product_category_id ? req.product_category_id : 0;
    const measurement_id = req.measurement_id ? req.measurement_id : 0;
    const branch_id = req.branch_id;

    try {
        let flag = false;
        let errorMsg = '';
        // Check if brand id is on record or not
        let brandExist = await Brand.findAll({
            where: {
                id: brand_id
            }
        });
        if (!brandExist.length && brand_id) {
            flag = true;
            errorMsg = "Brand not exist in record";
        }

        //Check if product_category_id is on record or not
        let productCategoryExist = await ProductCategory.findAll({
            where: {
                id: product_category_id
            }
        });
        if (!productCategoryExist.length && flag == false && product_category_id) {
            flag = true;
            errorMsg = "Product Category not exist in record";
        }

        //Check if measurement_id is on record or not
        let measurementExist = await Measurement.findAll({
            where: {
                id: measurement_id
            }
        });
        if (!measurementExist.length && flag == false && measurement_id) {
            flag = true;
            errorMsg = "Measurement not exist in record";
        }

        // Check if branch id is exist or not for admin
        if (!branch_id && userRoleId == CONSTANTS.ADMIN) {
            flag = true;
            errorMsg = "Branch id is required";
        }

        //Check if branch_id is on record or not
        let branchExist = await Branch.findAll({
            where: {
                id: branch_id
            }
        });
        if (!branchExist.length && flag == false && userRoleId == CONSTANTS.ADMIN) {
            flag = true;
            errorMsg = "Branch not exist in record";
        }

        //Check if admin is assign to given branch id or not
        let userAccessToBranch = await UserBranch.findAll({
            where: {
                user_id: userId,
                branch_id: branch_id
            }
        });
        if (!userAccessToBranch.length && flag == false && userRoleId == CONSTANTS.ADMIN) {
            flag = true;
            errorMsg = "You are not an admin of selected branch";
        }

        // if flag is true then respond back with error otherwise add new stock
        if (flag == true) {
            return { status: "error", message: errorMsg };
        } else {
            let getStockQuery = 'select remaining_stock.*,brands.brand_name,product_categories.product_category_name,measurements.measurement,branches.branch_name,branches.Address from remaining_stock join brands on remaining_stock.brand_id=brands.id join product_categories on remaining_stock.product_category_id=product_categories.id join measurements on remaining_stock.measurement_id=measurements.id join branches on remaining_stock.branch_id=branches.id where ';

            if (brand_id) {
                getStockQuery += "remaining_stock.brand_id=(:brandid) and ";
            }
            if (product_category_id) {
                getStockQuery += "remaining_stock.product_category_id=(:productcategoryid) and ";
            }
            if (measurement_id) {
                getStockQuery += "remaining_stock.measurement_id=(:measurementid) and ";
            }
            if (branch_id) {
                getStockQuery += "remaining_stock.branch_id=(:branchid) and ";
            }

            getStockQuery += "1=1 ORDER BY brands.brand_name";

            let remaningStockData = await db.sequelize.query(
                getStockQuery, {
                    replacements: {
                        brandid: brand_id,
                        productcategoryid: product_category_id,
                        measurementid: measurement_id,
                        branchid: branch_id,
                    },
                    type: db.sequelize.QueryTypes.SELECT,
                }
            );
            if (remaningStockData.length)
                return { status: 200, data: remaningStockData };
            else
                return { status: 200, data: CONSTANTS.NOT_FOUND };
        }
    } catch (err) {
        console.log(err)
        return { status: "error", message: err.message };
    }
}

module.exports = {
    addStock,
    getStock,
    getRemainingStock
};