-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 19, 2025 at 01:40 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sd2-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `Banned_users`
--

CREATE TABLE `Banned_users` (
  `ban_ID` int NOT NULL,
  `user_ID` int NOT NULL,
  `admin_ID` int DEFAULT NULL,
  `ban_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Banned_users`
--

INSERT INTO `Banned_users` (`ban_ID`, `user_ID`, `admin_ID`, `ban_date`) VALUES
(40, 56, 3, '2025-02-18 10:00:00'),
(41, 57, 4, '2025-02-18 10:05:00'),
(42, 58, 2, '2025-02-18 12:35:00'),
(43, 59, 3, '2025-02-18 11:20:10'),
(44, 60, 3, '2025-02-18 10:00:00'),
(45, 61, 3, '2025-02-20 10:00:00'),
(46, 62, 3, '2025-02-20 10:00:00'),
(47, 63, 3, '2025-02-21 11:00:00'),
(48, 64, 5, '2025-02-22 11:00:00'),
(49, 65, 5, '2025-02-22 11:34:00'),
(50, 66, 5, '2025-02-22 10:35:00'),
(51, 67, 3, '2025-02-22 11:37:00'),
(52, 68, 5, '2025-02-23 12:40:00'),
(53, 69, 5, '2025-02-23 12:34:00'),
(54, 70, 5, '2025-02-23 12:55:00'),
(55, 71, 5, '2025-02-24 10:00:00'),
(56, 72, 4, '2025-02-24 10:00:00'),
(57, 73, 1, '2025-02-24 10:00:00'),
(58, 74, 4, '2025-02-25 09:05:00'),
(59, 76, 1, '2025-02-26 08:10:00'),
(60, 77, 3, '2025-02-26 08:15:00'),
(61, 78, 5, '2025-02-27 10:20:00'),
(62, 79, 2, '2025-02-27 10:25:00'),
(63, 80, 4, '2025-02-28 10:30:00'),
(64, 81, 3, '2025-02-28 10:35:00'),
(65, 83, 1, '2025-03-01 09:40:00'),
(66, 84, 5, '2025-03-01 09:45:00'),
(67, 86, 2, '2025-03-02 11:50:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Banned_users`
--
ALTER TABLE `Banned_users`
  ADD PRIMARY KEY (`ban_ID`),
  ADD KEY `fk_banned_users_user` (`user_ID`),
  ADD KEY `fk_banned_users_admin` (`admin_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Banned_users`
--
ALTER TABLE `Banned_users`
  MODIFY `ban_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Banned_users`
--
ALTER TABLE `Banned_users`
  ADD CONSTRAINT `fk_banned_users_admin` FOREIGN KEY (`admin_ID`) REFERENCES `Admin_info` (`admin_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_banned_users_user` FOREIGN KEY (`user_ID`) REFERENCES `Users` (`user_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
