/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `check_in_date` datetime DEFAULT NULL,
  `check_out_date` datetime DEFAULT NULL,
  `guest_count` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`booking_id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Bookings_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`room_id`),
  CONSTRAINT `Bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `review_date` datetime DEFAULT NULL,
  `content` text,
  `rating` int DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`comment_id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `Rooms` (`room_id`),
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Locations` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) DEFAULT NULL,
  `description` text,
  `guests` int DEFAULT NULL,
  `bedrooms` int DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `washing_machine` tinyint(1) DEFAULT NULL,
  `iron` tinyint(1) DEFAULT NULL,
  `tv` tinyint(1) DEFAULT NULL,
  `air_conditioner` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `kitchen` tinyint(1) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `swimming_pool` tinyint(1) DEFAULT NULL,
  `ironing_board` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location_id` int DEFAULT NULL,
  `hidden` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`room_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `Rooms_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `Locations` (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `refresh_token` text,
  `hidden` tinyint(1) DEFAULT '1',
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `Bookings` (`booking_id`, `room_id`, `check_in_date`, `check_out_date`, `guest_count`, `user_id`, `hidden`) VALUES
(1, 1, '2024-07-02 17:35:31', '2024-07-05 17:35:31', 1, 1, 1);


INSERT INTO `Comments` (`comment_id`, `room_id`, `user_id`, `review_date`, `content`, `rating`, `hidden`) VALUES
(1, 1, 1, '2024-07-02 18:03:04', 'Hà lố', 10, 0);
INSERT INTO `Comments` (`comment_id`, `room_id`, `user_id`, `review_date`, `content`, `rating`, `hidden`) VALUES
(2, 1, 1, NULL, 'Hello', 10, 1);
INSERT INTO `Comments` (`comment_id`, `room_id`, `user_id`, `review_date`, `content`, `rating`, `hidden`) VALUES
(3, 1, 1, NULL, '123123', 11, 1);
INSERT INTO `Comments` (`comment_id`, `room_id`, `user_id`, `review_date`, `content`, `rating`, `hidden`) VALUES
(4, 1, 1, NULL, '123123', 11, 1),
(6, 1, 1, NULL, '123', 123, 0),
(7, 1, 1, NULL, '123', 123, 1),
(8, 1, 1, NULL, '123', 123, 1),
(9, 1, 1, '2024-07-06 00:00:00', '123', 123, 1),
(10, 1, 1, '2024-07-02 17:56:11', 'Xin chào', 10, 1);

INSERT INTO `Locations` (`location_id`, `location_name`, `city`, `country`, `image`, `hidden`) VALUES
(1, 'Ha_Noi', 'Hà Nội', 'Hà Nội', 'localhost:8080/public/img/1719853859618_281637915_447677891_466630152582282_2219314990316732131_n.jpg', 0);
INSERT INTO `Locations` (`location_id`, `location_name`, `city`, `country`, `image`, `hidden`) VALUES
(2, NULL, NULL, NULL, 'localhost:8080/public/img/1719848390236_880897308_logo_MB.jpg', 1);
INSERT INTO `Locations` (`location_id`, `location_name`, `city`, `country`, `image`, `hidden`) VALUES
(3, 'Ha_Noi', 'Hà Nội', 'Hà Nội', 'localhost:8080/public/img/1719848544697_205495878_logo_MB.jpg', 1);

INSERT INTO `Rooms` (`room_id`, `room_name`, `description`, `guests`, `bedrooms`, `beds`, `bathrooms`, `price`, `washing_machine`, `iron`, `tv`, `air_conditioner`, `wifi`, `kitchen`, `parking`, `swimming_pool`, `ironing_board`, `image`, `location_id`, `hidden`) VALUES
(1, 'TEst', '123', 123, 123, 123, 123, 123123, 1, 1, 1, 1, 1, 1, 1, 1, 1, 'localhost:8080/public/img/1719940848157_60517030_447677891_466630152582282_2219314990316732131_n.jpg', 1, 1);


INSERT INTO `Users` (`user_id`, `name`, `email`, `password`, `phone`, `birth_date`, `gender`, `role`, `refresh_token`, `hidden`, `avatar`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$yc0qQ5z92fh13vA2DCMZdemAm2ZuyO/wSIaLUXkEr7UOKAe4Tda46', '0336114129', '2004-04-15', 1, 'ADMIN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJrZXkiOiJHcHAwRDkiLCJpYXQiOjE3MTk1MDE0ODUsImV4cCI6MTcyMDEwNjI4NX0.O2RQl4-MRGoW6sRUu310HxdygQdgDSu4r8NDE2z18FM', 1, 'localhost:8080/public/img/1719855968802_859761366_download.jpeg');
INSERT INTO `Users` (`user_id`, `name`, `email`, `password`, `phone`, `birth_date`, `gender`, `role`, `refresh_token`, `hidden`, `avatar`) VALUES
(2, 'Test', 'test@gmail.com', '$2b$10$yc0qQ5z92fh13vA2DCMZdemAm2ZuyO/wSIaLUXkEr7UOKAe4Tda46', '0314141441', '2024-07-01', 1, 'USER', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJrZXkiOiJHcHAwRDkiLCJpYXQiOjE3MTk1MDE0ODUsImV4cCI6MTcyMDEwNjI4NX0.O2RQl4-MRGoW6sRUu310HxdygQdgDSu4r8NDE2z18FM', 1, 'localhost:8080/public/img/1719855968802_859761366_download.jpeg');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;