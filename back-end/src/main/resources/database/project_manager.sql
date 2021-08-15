/*
 Navicat Premium Data Transfer

 Source Server         : AtwoM
 Source Server Type    : MariaDB
 Source Server Version : 100603
 Source Host           : localhost:3308
 Source Schema         : project_manager

 Target Server Type    : MariaDB
 Target Server Version : 100603
 File Encoding         : 65001

 Date: 14/08/2021 17:30:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `des` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `is_deleted` binary(1) NOT NULL,
  `status` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `create_date` timestamp(0) NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `update_date` timestamp(0) NULL DEFAULT NULL,
  `create_user` int(11) NOT NULL,
  `update_user` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `TK_CREATE_USER_ID_idx`(`create_user`) USING BTREE,
  INDEX `TK_UPDATE_USER_ID_idx`(`update_user`) USING BTREE,
  CONSTRAINT `TK_CREATE_USER_ID` FOREIGN KEY (`create_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `TK_UPDATE_USER_ID` FOREIGN KEY (`update_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES (1, 'project test', NULL, NULL, NULL, 0x30, 'done', '2021-08-10 14:58:07', NULL, 1, NULL);

-- ----------------------------
-- Table structure for project_employee
-- ----------------------------
DROP TABLE IF EXISTS `project_employee`;
CREATE TABLE `project_employee`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `des` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `is_deleted` binary(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_USER_ID_idx`(`user_id`) USING BTREE,
  INDEX `FK_PROJECT_ID_idx`(`project_id`) USING BTREE,
  CONSTRAINT `FK_PROJECT_ID` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_USER_ID` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of project_employee
-- ----------------------------
INSERT INTO `project_employee` VALUES (1, 1, 2, 'dev', '', 0x30);
INSERT INTO `project_employee` VALUES (2, 1, 1, 'admin', '', 0x30);
INSERT INTO `project_employee` VALUES (3, 1, 3, 'dev', '', 0x30);
INSERT INTO `project_employee` VALUES (4, 1, 4, 'dev', '', 0x30);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `task_type` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `priority` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `status` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `project_id` int(11) NOT NULL,
  `create_date` timestamp(0) NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `update_date` timestamp(0) NULL DEFAULT NULL,
  `create_user` int(11) NOT NULL,
  `task_manager_id` int(11) NULL DEFAULT NULL,
  `is_deleted` binary(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_PROJECT_ID_idx`(`project_id`) USING BTREE,
  INDEX `FK_CREATE_USER_ID_idx`(`create_user`) USING BTREE,
  INDEX `FK_TASK_MANAGER_ID_idx`(`task_manager_id`) USING BTREE,
  CONSTRAINT `FK_CREATE_USER_ID` FOREIGN KEY (`create_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_OF_PROJECT_ID` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_TASK_MANAGER_ID` FOREIGN KEY (`task_manager_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, 'task test', '2021-08-10', NULL, 'feature', 'low', 'done', 1, '2021-08-14 17:10:09', NULL, 1, NULL, 0x30);

-- ----------------------------
-- Table structure for task_history
-- ----------------------------
DROP TABLE IF EXISTS `task_history`;
CREATE TABLE `task_history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `des` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `pre_starus` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `status` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `update_date` timestamp(0) NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `update_user` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_TASK_ID_idx`(`task_id`) USING BTREE,
  INDEX `FK_UPDATE_USER_ID_idx`(`update_user`) USING BTREE,
  CONSTRAINT `FK_TASK_ID` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_UPDATE_USER_ID` FOREIGN KEY (`update_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `des` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `is_deleted` binary(1) NOT NULL,
  `todo_type` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `status` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `task_id` int(11) NOT NULL,
  `create_date` timestamp(0) NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `update_date` timestamp(0) NULL DEFAULT NULL,
  `create_user` int(11) NOT NULL,
  `assigned_user` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_TODO_TASK_ID_idx`(`task_id`) USING BTREE,
  INDEX `FK_CREATE_USER_ID_idx`(`create_user`) USING BTREE,
  INDEX `FK_ASSIGNED_USER_ID_idx`(`assigned_user`) USING BTREE,
  CONSTRAINT `FK_TODO_ASSIGNED_USER_ID` FOREIGN KEY (`assigned_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_TODO_CREATE_USER_ID` FOREIGN KEY (`create_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_TODO_TASK_ID` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of todo
-- ----------------------------
INSERT INTO `todo` VALUES (1, 'todo test', NULL, '2021-08-10', NULL, 0x30, 'feature', NULL, 1, '2021-08-10 15:24:14', NULL, 1, NULL);

-- ----------------------------
-- Table structure for todo_history
-- ----------------------------
DROP TABLE IF EXISTS `todo_history`;
CREATE TABLE `todo_history`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `des` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `pre_status` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `update_date` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `update_user` int(11) NOT NULL,
  `todo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_TODO_ID_idx`(`todo_id`) USING BTREE,
  INDEX `FK_TH_UPDATE_USER_idx`(`update_user`) USING BTREE,
  CONSTRAINT `FK_TH_UPDATE_USER` FOREIGN KEY (`update_user`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_TODO_ID` FOREIGN KEY (`todo_id`) REFERENCES `todo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `is_admin` binary(1) NULL DEFAULT NULL,
  `is_deleted` binary(1) NULL DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `phone` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  `create_date` date NULL DEFAULT NULL,
  `update_date` date NULL DEFAULT NULL,
  `create_user` int(11) NULL DEFAULT NULL,
  `encrypted_password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 'admin', 0x31, 0x30, NULL, NULL, NULL, '2021-08-10', '2021-08-10', NULL, '$2a$12$UzlgaUuqN9U5ZWeYu7IMR.GJMpKfAYaw6NBp5pwH7R9JAaeJqQKMC');
INSERT INTO `user` VALUES (2, 'luongpd', 'luongpd', 0x30, 0x30, NULL, NULL, NULL, '2021-08-10', NULL, NULL, '$2a$12$EanFnyZqB7mxyypViyvG1eFc1KS8VaOY5hL6mwVW3Qh2yz71mcoI2');
INSERT INTO `user` VALUES (3, 'test1', 'test', 0x30, 0x30, NULL, NULL, NULL, '2021-08-12', NULL, NULL, '$2a$10$KlTviw.quIgm3lkF/l.H0.H3GiaJiuiwPIUkMCe9.3oihPhRj7f2S');
INSERT INTO `user` VALUES (4, 'test2', 'test1', 0x30, 0x30, NULL, NULL, NULL, '2021-08-12', NULL, NULL, '$2a$10$rsIF6DkanYPjjdtNiwX4BOM70nlILmpvjHgZex9vlO0pS0lT.7UN.');
INSERT INTO `user` VALUES (5, 'test6', 'test1', 0x30, 0x31, NULL, NULL, NULL, '2021-08-12', NULL, NULL, '$2a$10$.h63nGvrBrCF.QLbiwGr2.cdfNl6d3lL4Hkhqr7hMJrF8ucnM09AW');
INSERT INTO `user` VALUES (6, 'test4', 'test1', 0x30, 0x30, NULL, NULL, NULL, '2021-08-12', NULL, NULL, '$2a$10$P913qsr3/cZqqjuSdTVZyONiQn6QNF8rze3DDrSY0Gu64vaXiulfa');
INSERT INTO `user` VALUES (7, 'test3', 'test1', 0x30, 0x30, NULL, NULL, NULL, '2021-08-12', NULL, NULL, '$2a$10$VK/46DIZnsSm/4uC5RbDrO2Jw8qBLxjRciOLHG7rsBi26R063njXK');
INSERT INTO `user` VALUES (8, 'test5', 'test1', 0x30, 0x31, NULL, NULL, NULL, '2021-08-12', NULL, NULL, '$2a$10$BlMDd3S1DklRE.Uybzt8PemKQD8iQ9uCsKCIwISb7gNR.jzlRomyi');
INSERT INTO `user` VALUES (12, 'luong1', 'string', 0x30, 0x30, NULL, NULL, NULL, '2021-08-13', NULL, 1, '$2a$10$g4amftiHFsGNP1MhZ9MLmOzJpmEjChG.rwx.9e4jPpwaY6nd/n.wC');

SET FOREIGN_KEY_CHECKS = 1;
