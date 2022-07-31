var uuid = require('uuid-random');

const db = require("../model/index");
// Including models
const { Branch, UserBranch, SaleTypes, Brand, ProductCategory, Measurement, RemainingStock, Sales, SalesTransation } = db.sequelize.models;
// including constant file
const CONSTANTS = require('../shared/constants');

//Add sale service
const addSale = async(req, res) => {
    const created_by = userId;
    const branch_id = req.branch_id;
    const sales_type_id = req.sales_type_id;
    const sales = req.sales;

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

        //Check if sales_type_id is on record or not
        let saleTypesExist = await SaleTypes.findAll({
            where: {
                id: sales_type_id
            }
        });
        if (!saleTypesExist.length && flag == false) {
            flag = true;
            errorMsg = CONSTANTS.SALE_TYPE_NOT_EXIST;
        }

        // Check if sale array is exist or not
        if (!sales.length && flag == false) {
            flag = true;
            errorMsg = CONSTANTS.SALE_ARRAY_NOT_EMPTY;
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

        let transaction_no = uuid();
        if (flag == true) {
            return { status: "error", message: errorMsg };
        } else {
            // Validation for individual array
            for (var sale = 0; sale < sales.length; sale++) {
                let brand_id = sales[sale].brand_id;
                let product_category_id = sales[sale].product_category_id;
                let measurement_id = sales[sale].measurement_id;

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
                if (!sales[sale].unit_sale_price && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.UNIT_SALE_PRICE_REQUIRED;
                }
                if (!sales[sale].item_count && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.ITEM_COUNT_REQUIRED;
                }

                //Check if brand_id is on record or not
                let brandExist = await Brand.findAll({
                    where: {
                        id: sales[sale].brand_id
                    }
                });
                if (!brandExist.length && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.BRAND_NOT_EXIST;
                }

                //Check if product_category_id is on record or not
                let productCategoryExist = await ProductCategory.findAll({
                    where: {
                        id: sales[sale].product_category_id
                    }
                });
                if (!productCategoryExist.length && flag == false) {
                    flag = true;
                    errorMsg = PRODUCT_CATEGORY_NOT_EXIST;
                }

                //Check if measurement_id is on record or not
                let measurementExist = await Measurement.findAll({
                    where: {
                        id: sales[sale].measurement_id
                    }
                });
                if (!measurementExist.length && flag == false) {
                    flag = true;
                    errorMsg = CONSTANTS.MEASUREMENT_NOT_EXIST
                }

                // Check if sale is avilable or not
                let saleExist = await RemainingStock.findAll({
                    attribute: ['stock_remaining'],
                    where: {
                        brand_id,
                        product_category_id,
                        measurement_id,
                        branch_id
                    },
                    raw: true,
                });
                let stockremaining = 0;
                if (saleExist.length)
                    stockremaining = saleExist[0].stock_remaining ? saleExist[0].stock_remaining : 0;

                if (stockremaining < sales[sale].item_count && flag == false) {
                    flag = true;
                    errorMsg = brandExist[0].brand_name + " - " + productCategoryExist[0].product_category_name + " (" + measurementExist[0].measurement + ")" + " is Out of sale";
                }

                if (flag == true) {
                    return { status: "error", message: errorMsg + " for sale item number " + (sale + 1) };
                }

                if ((sale + 1) == sales.length) {
                    if (flag == false) {
                        let total_item_count = 0;
                        let total_sale_price = 0;

                        for (var sale = 0; sale < sales.length; sale++) {
                            let unit_sale_price = sales[sale].unit_sale_price;
                            let item_count = sales[sale].item_count;
                            let brand_id = sales[sale].brand_id;
                            let product_category_id = sales[sale].product_category_id;
                            let measurement_id = sales[sale].measurement_id;

                            total_item_count += item_count;
                            total_sale_price = total_sale_price + (unit_sale_price * item_count);
                            // Add into sales_by_transaction_id table (individual record for each sold item)
                            let salesByTransationData = {
                                transaction_no,
                                unit_sale_price,
                                item_count,
                                branch_id,
                                product_category_id,
                                measurement_id,
                                brand_id
                            }
                            await SalesTransation.create(salesByTransationData)

                            // Check if sale is avilable or not
                            let saleExist = await RemainingStock.findAll({
                                attribute: ['stock_remaining'],
                                where: {
                                    brand_id,
                                    product_category_id,
                                    measurement_id,
                                    branch_id
                                },
                                raw: true,
                            });

                            // Reduce from sale table
                            let newRemainingStock = saleExist[0].stock_remaining - sales[sale].item_count;
                            let newRemainingStockData = {
                                stock_remaining: newRemainingStock
                            }
                            await RemainingStock.update(newRemainingStockData, {
                                where: {
                                    brand_id,
                                    product_category_id,
                                    measurement_id,
                                    branch_id
                                }
                            });
                        }

                        //Add into sales table
                        let salesData = {
                            transaction_no,
                            created_by,
                            total_item_count,
                            total_sale_price,
                            sales_type_id
                        };
                        const addSale = await Sales.create(salesData)

                        return { status: 200, data: addSale };
                    }
                }
            }
        }
    } catch (err) {
        console.log(err)
        return { status: "error", message: err.message };
    }
}


//Get sale service
const getSale = async(req, res) => {
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
            errorMsg = CONSTANTS.NOT_ADMIN_OF_SELECTED_BRANCH;
        }

        // if flag is true then respond back with error otherwise add new sale
        if (flag == true) {
            return { status: "error", message: errorMsg };
        } else {

            let getSaleQuery = 'select sales.transaction_no from sales join sales_by_transaction_id on sales_by_transaction_id.transaction_no = sales.transaction_no where ';

            if (brand_id) {
                getSaleQuery += "sales_by_transaction_id.brand_id=(:brandid) and ";
            }
            if (product_category_id) {
                getSaleQuery += "sales_by_transaction_id.product_category_id=(:productcategoryid) and ";
            }
            if (measurement_id) {
                getSaleQuery += "sales_by_transaction_id.measurement_id=(:measurementid) and ";
            }
            if (branch_id) {
                getSaleQuery += "sales_by_transaction_id.branch_id=(:branchid) and ";
            }
            if (from_date) {
                if (to_date) {
                    getSaleQuery += "DATE(sales.created_at) >= (:fromdate) and DATE(sales.created_at) <= (:todate) and ";
                } else {
                    getSaleQuery += "DATE(sales.created_at)=(:fromdate) and ";
                }
            }

            getSaleQuery += "1=1";

            let saleData = await db.sequelize.query(
                getSaleQuery, {
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

            // Remove dulicate transation_no from array
            let uniq = {};
            let transation_numbers = saleData.filter(obj => !uniq[obj.transaction_no] && (uniq[obj.transaction_no] = true))

            let finalResponseArray = [];
            for (var transation_number = 0; transation_number < transation_numbers.length; transation_number++) {
                // Get Data from sale table
                let saleDataQuery = "select sales.*,sale_types.name,users.email,users.first_name,users.last_name from sales join sale_types on sales.sales_type_id=sale_types.id join users on sales.created_by=users.id where sales.transaction_no='" + transation_numbers[transation_number].transaction_no + "'";

                let saleData = await db.sequelize.query(
                    saleDataQuery, {
                        type: db.sequelize.QueryTypes.SELECT,
                    }
                );
                finalResponseArray.push(saleData);

                // Get data from transation table
                let saleTransationQuery = "select sales_by_transaction_id.*,brands.brand_name,product_categories.product_category_name,measurements.measurement,branches.branch_name,branches.Address from sales_by_transaction_id join brands on sales_by_transaction_id.brand_id=brands.id join product_categories on sales_by_transaction_id.product_category_id=product_categories.id join measurements on sales_by_transaction_id.measurement_id=measurements.id join branches on sales_by_transaction_id.branch_id=branches.id join sales on sales_by_transaction_id.transaction_no = sales.transaction_no where sales.transaction_no='" + transation_numbers[transation_number].transaction_no + "' and ";

                if (brand_id) {
                    saleTransationQuery += "sales_by_transaction_id.brand_id=(:brandid) and ";
                }
                if (product_category_id) {
                    saleTransationQuery += "sales_by_transaction_id.product_category_id=(:productcategoryid) and ";
                }
                if (measurement_id) {
                    saleTransationQuery += "sales_by_transaction_id.measurement_id=(:measurementid) and ";
                }
                if (branch_id) {
                    saleTransationQuery += "sales_by_transaction_id.branch_id=(:branchid) and ";
                }
                if (from_date) {
                    if (to_date) {
                        saleTransationQuery += "DATE(sales.created_at) >= (:fromdate) and DATE(sales.created_at) <= (:todate) and ";
                    } else {
                        saleTransationQuery += "DATE(sales.created_at)=(:fromdate) and ";
                    }
                }

                saleTransationQuery += "1=1";

                let saleTransationData = await db.sequelize.query(
                    saleTransationQuery, {
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
                finalResponseArray[transation_number].push(saleTransationData);
            }

            if (finalResponseArray.length)
                return { status: 200, data: finalResponseArray };
            else
                return { status: 200, data: CONSTANTS.NOT_FOUND };
        }
    } catch (err) {
        console.log(err)
        return { status: "error", message: err.message };
    }
}

module.exports = {
    addSale,
    getSale
};