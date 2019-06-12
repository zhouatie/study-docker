-- -- 创建数据库
-- create database `docker_mysql` default character set utf8 collate utf8_general_ci;
 
-- use docker_mysql;
 
-- -- 建表
-- DROP TABLE IF EXISTS `user`;
 
-- CREATE TABLE `user` (
--  `id` bigint(20) NOT NULL,
--  `created_at` bigint(40) DEFAULT NULL,
--  `last_modified` bigint(40) DEFAULT NULL,
--  `email` varchar(255) DEFAULT NULL,
--  `first_name` varchar(255) DEFAULT NULL,
--  `last_name` varchar(255) DEFAULT NULL,
--  `username` varchar(255) DEFAULT NULL,
--  PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
-- 创建数据库
create database `todolist` default character set utf8 collate utf8_general_ci;
 
use todolist;
 
-- 建表
DROP TABLE IF EXISTS `list`;
 
-- CREATE TABLE `list` (
--  `id` bigint(20) NOT NULL,
--  `created_at` bigint(40) DEFAULT NULL,
--  `last_modified` bigint(40) DEFAULT NULL,
--  `email` varchar(255) DEFAULT NULL,
--  `first_name` varchar(255) DEFAULT NULL,
--  `last_name` varchar(255) DEFAULT NULL,
--  `username` varchar(255) DEFAULT NULL,
--  PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
CREATE TABLE `list` (
    `id` INT(11) AUTO_INCREMENT PRIMARY KEY,
    `text` VARCHAR(255),
    `check` INT(11) DEFAULT 0
)