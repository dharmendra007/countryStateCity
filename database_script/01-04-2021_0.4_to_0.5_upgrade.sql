CREATE TABLE `kotecha`.`branches` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `branch_name` VARCHAR(255) NOT NULL,
  `Address` VARCHAR(45) NOT NULL,
  `country_id` INT NOT NULL,
  `state_id` INT NOT NULL,
  `city_id` INT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `branch_name_UNIQUE` (`branch_name` ASC) VISIBLE);



CREATE TABLE `kotecha`.`user_branches` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `branch_id` INT NOT NULL,
  PRIMARY KEY (`id`));
