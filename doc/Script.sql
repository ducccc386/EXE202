CREATE DATABASE  IF NOT EXISTS `studyhub` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `studyhub`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: studyhub
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `message` text,
  `status` enum('ACCEPTED','PENDING','REJECTED') NOT NULL,
  `request_id` bigint NOT NULL,
  `tutor_profile_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1xeuca8pev6e5dwrlvurtnhul` (`request_id`),
  KEY `FKftg82wxb1dhdja6cc17pxi62w` (`tutor_profile_id`),
  CONSTRAINT `FK1xeuca8pev6e5dwrlvurtnhul` FOREIGN KEY (`request_id`) REFERENCES `parent_requests` (`id`),
  CONSTRAINT `FKftg82wxb1dhdja6cc17pxi62w` FOREIGN KEY (`tutor_profile_id`) REFERENCES `tutor_profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'2026-05-29 07:44:18.039680','Chào phụ huynh, em đã có 3 năm kinh nghiệm giảng dạy môn Toán.','PENDING',10,1),(2,'2026-05-29 10:12:11.901921','d','REJECTED',1,1),(3,'2026-05-29 10:20:28.910259','t ngon','PENDING',2,1),(4,'2026-05-29 10:28:38.802736','asfasfsaasf','PENDING',8,1),(5,'2026-05-29 11:27:26.525108','bo may dep trai','PENDING',7,1);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `final_price` double DEFAULT NULL,
  `payment_status` varchar(20) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `parent_id` bigint NOT NULL,
  `request_id` bigint NOT NULL,
  `tutor_profile_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6ieaopav310xq0nskwct77wh2` (`parent_id`),
  KEY `FKc8g2xdpvsnon1ibg5qhq66w27` (`request_id`),
  KEY `FKk0725bnqdjvn2mydt8wn9r4ml` (`tutor_profile_id`),
  CONSTRAINT `FK6ieaopav310xq0nskwct77wh2` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKc8g2xdpvsnon1ibg5qhq66w27` FOREIGN KEY (`request_id`) REFERENCES `parent_requests` (`id`),
  CONSTRAINT `FKk0725bnqdjvn2mydt8wn9r4ml` FOREIGN KEY (`tutor_profile_id`) REFERENCES `tutor_profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_message`
--

DROP TABLE IF EXISTS `chat_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `content` text,
  `sender_id` bigint DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `conversation_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkxe2b8q35d0baph3krucvraif` (`conversation_id`),
  CONSTRAINT `FKkxe2b8q35d0baph3krucvraif` FOREIGN KEY (`conversation_id`) REFERENCES `conversation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_message`
--

LOCK TABLES `chat_message` WRITE;
/*!40000 ALTER TABLE `chat_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `application_id` bigint DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  `tutor_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK93voqappifl19j0jtyeyca2ac` (`application_id`),
  KEY `FK2f3n6a4mt8ot4d2crkqubkqd` (`parent_id`),
  KEY `FKgbvlpxdmbunxp0qgg2khysr67` (`tutor_id`),
  CONSTRAINT `FK1uptawrhvfnj8rx9hhly98eeq` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`),
  CONSTRAINT `FK2f3n6a4mt8ot4d2crkqubkqd` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKgbvlpxdmbunxp0qgg2khysr67` FOREIGN KEY (`tutor_id`) REFERENCES `tutor_profiles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_requests`
--

DROP TABLE IF EXISTS `parent_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_requests` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address_detail` varchar(255) DEFAULT NULL,
  `budget` double DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` text,
  `grade` varchar(50) DEFAULT NULL,
  `schedule_info` varchar(255) DEFAULT NULL,
  `sessions_per_week` int DEFAULT NULL,
  `status` enum('ACTIVE','BANNED','CLOSED','MATCHED','OPEN','PENDING') DEFAULT NULL,
  `teaching_mode` enum('BOTH','OFFLINE','ONLINE') DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `parent_id` bigint NOT NULL,
  `subject_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKig3dr7hyq9y1erto3dv8govep` (`parent_id`),
  KEY `FKcfts0729dd030lpxtag3rqw6e` (`subject_id`),
  CONSTRAINT `FKcfts0729dd030lpxtag3rqw6e` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
  CONSTRAINT `FKig3dr7hyq9y1erto3dv8govep` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_requests`
--

LOCK TABLES `parent_requests` WRITE;
/*!40000 ALTER TABLE `parent_requests` DISABLE KEYS */;
INSERT INTO `parent_requests` VALUES (1,'Số 2 ngõ 15 Duy Tân',250000,'Hà Nội','2026-05-29 00:03:54.000000','Cần tìm gia sư nam ưu tiên sinh viên Bách Khoa hoặc FPT dạy kèm cho em học sinh sức học trung bình khá, mục tiêu thi đại học 8 điểm Toán.','Lớp 12','Tối thứ 3 và tối thứ 5, từ 19h30',2,'OPEN','OFFLINE','Tìm gia sư Toán lớp 12 ôn thi đại học cấp tốc',2,1),(2,NULL,200000,NULL,'2026-05-28 19:14:12.767846','Cần gia sư kiên nhẫn ôn thi tốt nghiệp THPT, lấy lại gốc hình học không gian.','Lớp 12',NULL,3,'OPEN','ONLINE','Yêu cầu tìm gia sư môn Toán học',1,1),(3,NULL,2000000,NULL,'2026-05-28 19:14:39.727480','ngon\n','lớp 12',NULL,2,'OPEN','ONLINE','Yêu cầu tìm gia sư môn Hoá học',1,1),(4,NULL,250000,NULL,'2026-05-28 19:23:05.841732','Cần tìm gia sư nam ưu tiên sinh viên Bách Khoa ôn thi tốt nghiệp THPT.','Lớp 12',NULL,2,'OPEN','OFFLINE','Yêu cầu tìm gia sư môn Toán học',1,1),(5,NULL,250000,NULL,'2026-05-28 19:25:59.155167','Cần tìm gia sư nam ưu tiên sinh viên Bách Khoa ôn thi tốt nghiệp THPT, lấy lại gốc hình học không gian.','Lớp 11',NULL,2,'OPEN','OFFLINE','Yêu cầu tìm gia sư môn hoá học học',1,1),(6,NULL,20000000,NULL,'2026-05-28 19:26:41.454792','ngon','10',NULL,2,'OPEN','OFFLINE','Yêu cầu tìm gia sư môn toans',1,1),(7,NULL,250000,NULL,'2026-05-28 19:29:50.273203','Cần tìm gia sư nam gấp.','Lớp 12',NULL,2,'OPEN','OFFLINE','Yêu cầu tìm gia sư môn Toán học',1,1),(8,NULL,250000,NULL,'2026-05-28 19:30:55.011332','Cần tìm gia sư nam gấp.','Lớp 12',NULL,2,'OPEN','OFFLINE','Yêu cầu tìm gia sư môn Toán học',1,1),(9,'Số 2 ngõ 15 Duy Tân',250000,'Hà Nội','2026-05-28 19:31:19.908526','Cần tìm gia sư nam gấp.','Lớp 12','Tối thứ 3 và tối thứ 5, từ 19h30',2,'OPEN','OFFLINE','Tìm gia sư môn Toán học Lớp 12',1,1),(10,'ngach 15',30111111,'hcm','2026-05-28 19:39:24.696514','aswfasfsaf','10','deo bietq',2,'OPEN','OFFLINE','Tìm gia sư môn toans 10',1,1),(11,'Học trực tuyến qua mạng',12341,'ONLINE','2026-05-29 13:54:22.422960','ăefawtrawsfaw','àasfas','124124124',3,'OPEN','ONLINE','Tìm gia sư môn àgasfsa àasfas',1,1);
/*!40000 ALTER TABLE `parent_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKaodt3utnw0lsov4k9ta88dbpr` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (3,'Hóa học'),(5,'Ngữ văn'),(4,'Tiếng Anh'),(1,'Toán học'),(2,'Vật lý');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_profiles`
--

DROP TABLE IF EXISTS `tutor_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_profiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `average_rating` double DEFAULT NULL,
  `bio` text,
  `city` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `experience_years` int DEFAULT NULL,
  `hourly_rate` double DEFAULT NULL,
  `teaching_method` text,
  `teaching_mode` enum('BOTH','OFFLINE','ONLINE') DEFAULT NULL,
  `total_reviews` int DEFAULT NULL,
  `verified` bit(1) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK1sv0wlmajyhm2ogpfvuceciqa` (`user_id`),
  CONSTRAINT `FK3h4hc71bbx1xyce6kbjm1bagn` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_profiles`
--

LOCK TABLES `tutor_profiles` WRITE;
/*!40000 ALTER TABLE `tutor_profiles` DISABLE KEYS */;
INSERT INTO `tutor_profiles` VALUES (1,4.8,'Sinh viên năm cuối ngành CNTT trường Đại học FPT, có 2 năm kinh nghiệm luyện thi môn Toán và Tiếng Anh.','Hà Nội','2026-05-29 00:03:54.000000','Đại học FPT - Chuyên ngành Kỹ thuật Phần mềm',2,200000,'Tập trung vào tư duy bản chất, không học vẹt, kết hợp bài tập thực hành thực tế.','BOTH',12,_binary '',4),(2,4.9,'Giảng viên tự do tốt nghiệp Đại học Sư Phạm khoa Hóa, chuyên trị học sinh mất gốc lớp 10, 11, 12.','Hà Nội','2026-05-29 00:03:54.000000','Đại học Sư Phạm Hà Nội - Khoa Hóa học',5,250000,'Phương pháp sơ đồ tư duy, liên hệ thực tế cao giúp nhớ lâu kiến thức lý thuyết nặng.','OFFLINE',8,_binary '',5);
/*!40000 ALTER TABLE `tutor_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor_subjects`
--

DROP TABLE IF EXISTS `tutor_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor_subjects` (
  `tutor_profile_id` bigint NOT NULL,
  `subject_id` bigint NOT NULL,
  PRIMARY KEY (`tutor_profile_id`,`subject_id`),
  KEY `FKjerg289emeieviu113pdkgs72` (`subject_id`),
  CONSTRAINT `FK29h0te37fp577sqgi7ry7pw1t` FOREIGN KEY (`tutor_profile_id`) REFERENCES `tutor_profiles` (`id`),
  CONSTRAINT `FKjerg289emeieviu113pdkgs72` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor_subjects`
--

LOCK TABLES `tutor_subjects` WRITE;
/*!40000 ALTER TABLE `tutor_subjects` DISABLE KEYS */;
INSERT INTO `tutor_subjects` VALUES (1,1),(2,3),(1,4);
/*!40000 ALTER TABLE `tutor_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('ADMIN','PARENT','STUDENT','TUTOR') NOT NULL,
  `status` enum('ACTIVE','BANNED','CLOSED','MATCHED','OPEN','PENDING') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'2026-05-29 00:03:54.000000','admin@studyhub.com','Nguyễn Văn Admin','123456','0123456789','ADMIN','ACTIVE','2026-05-29 00:03:54.000000'),(2,NULL,'2026-05-29 00:03:54.000000','parent@gmail.com','Trần Thị Phụ Huynh','123456','0987654321','PARENT','ACTIVE','2026-05-29 00:03:54.000000'),(3,NULL,'2026-05-29 00:03:54.000000','parent2@gmail.com','Lê Hoàng Gia Trưởng','123456','0912345678','PARENT','ACTIVE','2026-05-29 00:03:54.000000'),(4,NULL,'2026-05-29 00:03:54.000000','tutor@gmail.com','Nguyễn Anh Đức','123456','0909090909','TUTOR','ACTIVE','2026-05-29 00:03:54.000000'),(5,NULL,'2026-05-29 00:03:54.000000','tutor2@gmail.com','Trần Minh Tâm','123456','0977778888','TUTOR','ACTIVE','2026-05-29 00:03:54.000000'),(6,NULL,'2026-05-28 17:52:07.902483','duc@gmail.com','Nguyễn Anh Đức','123','0123456789','TUTOR','ACTIVE','2026-05-28 17:52:07.902483');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-29 21:25:38
