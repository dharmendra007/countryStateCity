const productCategoryService = require("../services/productCategoryServices");
const CONSTANTS = require("../shared/constants");
const logger = require('../logger/logger');

// Get productCategory API
const getProductCategory = async(req, res) => {
    // Call sale Service
    let getProductCategory = await productCategoryService.getProductCategory(req.body);
    if (getProductCategory.status === CONSTANTS.ERROR) {
        logger.error(getProductCategory.message);
        return res.status(401).json({ msg: getProductCategory.message });
    } else if (getProductCategory.status == 200) {
        logger.info(CONSTANTS.FETCHED);
        return res.status(200).json({ msg: CONSTANTS.FETCHED, data: getProductCategory.data });
    } else {
        logger.error(CONSTANTS.SOMETHING_WRONG);
        return res.status(401).json({ msg: CONSTANTS.SOMETHING_WRONG });
    }
}

module.exports = {
    getProductCategory
}