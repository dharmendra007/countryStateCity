CREATE TABLE `kotecha`.`countries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `country_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `country_name_UNIQUE` (`country_name` ASC) VISIBLE);



CREATE TABLE `kotecha`.`states` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state_name` VARCHAR(45) NOT NULL,
  `country_id` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `state_name_UNIQUE` (`state_name` ASC) VISIBLE);



CREATE TABLE `kotecha`.`cities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `city_name` VARCHAR(45) NOT NULL,
  `state_id` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `city_name_UNIQUE` (`city_name` ASC) VISIBLE);



INSERT INTO `kotecha`.`countries` (`id`, `country_name`) VALUES ('1', 'India');
INSERT INTO `kotecha`.`states` (`id`, `state_name`, `country_id`) VALUES ('1', 'Karnataka', '1');
INSERT INTO `kotecha`.`cities` (`id`, `city_name`, `state_id`) VALUES ('1', 'Bangalore', '1');
