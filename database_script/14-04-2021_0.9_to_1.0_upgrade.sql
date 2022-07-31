ALTER TABLE `branches` 
DROP COLUMN `state_id`,
DROP COLUMN `country_id`,
CHANGE COLUMN `Address` `address` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `city_id` `city_name` VARCHAR(45) NOT NULL ;


ALTER TABLE `stocks` 
ADD INDEX `fk_stocks_1_idx` (`brand_id` ASC) ;
;
ALTER TABLE `stocks` 
ADD CONSTRAINT `fk_stocks_1`
  FOREIGN KEY (`brand_id`)
  REFERENCES `brands` (`id`)
  ON DELETE RESTRICT
  ON UPDATE RESTRICT;


ALTER TABLE `stocks` 
ADD INDEX `fk_stocks_2_idx` (`product_category_id` ASC) ,
ADD INDEX `fk_stocks_3_idx` (`measurement_id` ASC) ,
ADD INDEX `fk_stocks_4_idx` (`branch_id` ASC) ;
;
ALTER TABLE `stocks` 
ADD CONSTRAINT `fk_stocks_2`
  FOREIGN KEY (`product_category_id`)
  REFERENCES `product_categories` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stocks_3`
  FOREIGN KEY (`measurement_id`)
  REFERENCES `measurements` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stocks_4`
  FOREIGN KEY (`branch_id`)
  REFERENCES `branches` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `stocks` 
DROP FOREIGN KEY `fk_stocks_1`,
DROP FOREIGN KEY `fk_stocks_2`,
DROP FOREIGN KEY `fk_stocks_3`,
DROP FOREIGN KEY `fk_stocks_4`;
ALTER TABLE `stocks` 
ADD CONSTRAINT `fk_stocks_1`
  FOREIGN KEY (`brand_id`)
  REFERENCES `brands` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stocks_2`
  FOREIGN KEY (`product_category_id`)
  REFERENCES `product_categories` (`id`)
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stocks_3`
  FOREIGN KEY (`measurement_id`)
  REFERENCES `measurements` (`id`)
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_stocks_4`
  FOREIGN KEY (`branch_id`)
  REFERENCES `branches` (`id`)
  ON UPDATE NO ACTION;



ALTER TABLE `remaining_stock` 
ADD INDEX `fk_remaining_stock_1_idx` (`brand_id` ASC) ,
ADD INDEX `fk_remaining_stock_2_idx` (`product_category_id` ASC) ,
ADD INDEX `fk_remaining_stock_3_idx` (`measurement_id` ASC) ,
ADD INDEX `fk_remaining_stock_4_idx` (`branch_id` ASC) ;
;
ALTER TABLE `remaining_stock` 
ADD CONSTRAINT `fk_remaining_stock_1`
  FOREIGN KEY (`brand_id`)
  REFERENCES `brands` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_remaining_stock_2`
  FOREIGN KEY (`product_category_id`)
  REFERENCES `product_categories` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_remaining_stock_3`
  FOREIGN KEY (`measurement_id`)
  REFERENCES `measurements` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_remaining_stock_4`
  FOREIGN KEY (`branch_id`)
  REFERENCES `branches` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION;


ALTER TABLE `sales` 
ADD INDEX `fk_sales_1_idx` (`sales_type_id` ASC) ;
;
ALTER TABLE `sales` 
ADD CONSTRAINT `fk_sales_1`
  FOREIGN KEY (`sales_type_id`)
  REFERENCES `sale_types` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION;


ALTER TABLE `users` 
ADD INDEX `fk_users_1_idx` (`role_id` ASC) ;
;
ALTER TABLE `users` 
ADD CONSTRAINT `fk_users_1`
  FOREIGN KEY (`role_id`)
  REFERENCES `roles` (`id`)
  ON DELETE RESTRICT
  ON UPDATE NO ACTION;
