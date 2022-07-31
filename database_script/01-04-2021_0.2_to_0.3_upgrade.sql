CREATE TABLE `kotecha`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `role_name_UNIQUE` (`role_name` ASC) VISIBLE);


INSERT INTO `kotecha`.`roles` (`id`, `role_name`, `status`) VALUES ('1', 'Super Admin', '1');
INSERT INTO `kotecha`.`roles` (`id`, `role_name`, `status`) VALUES ('2', 'Admin', '1');
INSERT INTO `kotecha`.`roles` (`id`, `role_name`, `status`) VALUES ('3', 'User', '1');
