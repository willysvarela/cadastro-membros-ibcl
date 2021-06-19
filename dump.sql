CREATE DATABASE `ibcl` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `Member` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birth` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `civil_state` varchar(50) NOT NULL,
  `father_name` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `mother_name` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `district` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `social_network` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `how_join` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `favorite_reunion` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `has_ministry` tinyint(1) NOT NULL DEFAULT '0',
  `ministries` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `intendedMinistries` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `department` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ministery_leader` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `has_go` tinyint(1) NOT NULL DEFAULT '0',
  `go_leader` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `health_skills` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `teach_skills` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `social_skills` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `maintenance_skills` text,
  `other_skills` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3