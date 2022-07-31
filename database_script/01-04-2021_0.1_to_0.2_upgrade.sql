CREATE TABLE `kotecha`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `role_id` INT(5) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `status` VARCHAR(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


ALTER TABLE `kotecha`.`users` 
ADD COLUMN `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP AFTER `status`,
ADD COLUMN `created_by` INT(10) NULL AFTER `created_at`;

INSERT INTO `kotecha`.`users` (`id`, `first_name`, `last_name`, `email`, `role_id`, `password`, `status`) VALUES ('1', 'Super', 'Admin', 'superadmin@gmail.com', '1', '$2y$12$0xRQvxfnBDZrSFoDSPE2VO.qdAJCKY.HBq.N0.z8lJhV7UGzt7TpS', '1');


ALTER TABLE `kotecha`.`users` 
ADD INDEX `fk_users_1_idx` (`role_id` ASC) VISIBLE;
;


