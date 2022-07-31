CREATE TABLE `kotecha`.`brands` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand_name` VARCHAR(45) NOT NULL,
  `status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `brand_name_UNIQUE` (`brand_name` ASC) VISIBLE);


CREATE TABLE `kotecha`.`product_categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_category_name` VARCHAR(45) NOT NULL,
  `status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `brand_name_UNIQUE` (`product_category_name` ASC) VISIBLE);


CREATE TABLE `kotecha`.`measurements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `measurement` VARCHAR(45) NOT NULL,
  `status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `brand_name_UNIQUE` (`measurement` ASC) VISIBLE);


CREATE TABLE `kotecha`.`sale_types` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `status` INT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `brand_name_UNIQUE` (`name` ASC) VISIBLE);


INSERT INTO `kotecha`.`sale_types` (`id`, `name`, `status`) VALUES ('1', 'Sale', '1');
INSERT INTO `kotecha`.`sale_types` (`id`, `name`, `status`) VALUES ('2', 'Brackage', '1');
INSERT INTO `kotecha`.`sale_types` (`id`, `name`, `status`) VALUES ('3', 'Gift', '1');



