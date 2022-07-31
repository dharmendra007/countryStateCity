CREATE TABLE `kotecha`.`sales` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `transaction_no` VARCHAR(100) NOT NULL,
  `total_item_count` INT(10) NOT NULL,
  `total_sale_price` DECIMAL NOT NULL,
  `sales_type_id` INT(10) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `transaction_no_UNIQUE` (`transaction_no` ASC) VISIBLE);

CREATE TABLE `kotecha`.`sales_by_transaction_id` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `transaction_no` VARCHAR(100) NOT NULL,
  `unit_sale_price` DECIMAL NOT NULL,
  `item_count` INT(10) NOT NULL,
  `brand_id` INT(10) NOT NULL,
  `product_category_id` INT(10) NOT NULL,
  `measurement_id` INT(10) NOT NULL,
  `branch_id` INT(10) NOT NULL,
  PRIMARY KEY (`id`));


  ALTER TABLE `kotecha`.`stocks` 
CHANGE COLUMN `unit_price` `unit_price` DECIMAL(10,2) NOT NULL ;

