CREATE TABLE `remaining_stock` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand_id` INT(10) NOT NULL,
  `product_category_id` INT(10) NOT NULL,
  `measurement_id` INT(10) NOT NULL,
  `branch_id` INT(10) NOT NULL,
  `stock_remaining` INT(10) NOT NULL,
  PRIMARY KEY (`id`));


  ALTER TABLE `sales_by_transaction_id` 
CHANGE COLUMN `unit_sale_price` `unit_sale_price` DECIMAL(10,3) NOT NULL ;

