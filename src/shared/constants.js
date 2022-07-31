const CONSTANTS = {};

CONSTANTS.SECRETKEY_PATTERN =
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9\\s]).{8,16}$';
CONSTANTS.JWT_TOKEN_EXPIRY = '2d';
CONSTANTS.JWT_TOKEN_PREFIX = 'Bearer';
CONSTANTS.JWT_HEADER_STRING = 'Authorization';

CONSTANTS.JWT_ISSUER = "TEKNOTRAIT";
CONSTANTS.JWT_SECRET_KEY = "AJo7d6cjbc855hxshi08ybdc7tghsx45jlbf65";


// Roles
CONSTANTS.SUPER_ADMIN = 1;
CONSTANTS.ADMIN = 2;
CONSTANTS.USER = 3;
CONSTANTS.ACTIVE = 1;
CONSTANTS.INACTIVE = 0;

CONSTANTS.ERROR = "error";

// Custom Message
CONSTANTS.NOT_ACCESS = "You do not access to perform this action";
CONSTANTS.FETCHED = "Fetched Successfully";
CONSTANTS.SOMETHING_WRONG = "Something Wrong";
CONSTANTS.SOME_ERROR = "Some error occured";
CONSTANTS.ITEM_SOLD = "Item Sold Successfully";
CONSTANTS.STOCK_ADDED = "Stock Added Successfully";
CONSTANTS.INVALID_CRED = "Invalid credentials";
CONSTANTS.USER_DEACTIVATED = "User is deactivated";
CONSTANTS.USER_BRANCH_NOT_EMPTY = "User Branches should not be empty";
CONSTANTS.USER_REGISTRED = "User Details Added Successfully";
CONSTANTS.BRANCH_ADDED = "Branch Addedd Successfully";

CONSTANTS.BRANCH_NOT_EXIST = "Branch not exist in record";
CONSTANTS.SALE_TYPE_NOT_EXIST = "Sale Type not exist in record";
CONSTANTS.SALE_ARRAY_NOT_EMPTY = "Sale array should not be empty";
CONSTANTS.NOT_ADMIN_OF_SELECTED_BRANCH = "You are not an admin of selected branch";
CONSTANTS.BRAND_REQUIRED = "Brand Id is required";
CONSTANTS.PRODUCT_CATEGORY_REQUIRED = "Product Category Id is required";
CONSTANTS.MEASUREMENT_REQUIRED = "Measurement Id is required";
CONSTANTS.UNIT_SALE_PRICE_REQUIRED = "Unit Sale Price is required";
CONSTANTS.ITEM_COUNT_REQUIRED = "Item Count Id is required";
CONSTANTS.BRAND_NOT_EXIST = "Brand not exist in record";
CONSTANTS.PRODUCT_CATEGORY_NOT_EXIST = "Product Category not exist in record";
CONSTANTS.MEASUREMENT_NOT_EXIST = "Measurement not exist in record";
CONSTANTS.BRANCH_REQUIRED = "Branch id is required";
CONSTANTS.NOT_FOUND = "No Record Found";
CONSTANTS.QUANTITY_REQUIRED = "Quantity is required";
CONSTANTS.UNIT_PRICE_REQUIRED = "Unit Price is required";
CONSTANTS.USER_ALREADY_EXIST = "User already registered";
CONSTANTS.USER_SHOULD_HAVE_ONLY_ONE_BRANCH = "User should have only one branch";

module.exports = CONSTANTS;