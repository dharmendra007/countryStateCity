CREATE TABLE `kotecha`.`stocks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand_id` INT(10) NOT NULL,
  `product_category_id` INT(10) NOT NULL,
  `measurement_id` INT(10) NOT NULL,
  `quantity` INT(10) NOT NULL,
  `branch_id` INT(10) NOT NULL,
  `unit_price` DECIMAL NOT NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  `created_by` INT(10) NULL,
  PRIMARY KEY (`id`));
  
ALTER TABLE `kotecha`.`stocks` 
CHANGE COLUMN `created_at` `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `updated_at` `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ;
