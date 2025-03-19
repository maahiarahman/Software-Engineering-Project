-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 19, 2025 at 01:41 PM
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
-- Table structure for table `approve_users`
--

CREATE TABLE `approve_users` (
  `approve_ID` int NOT NULL,
  `user_ID` int NOT NULL,
  `approve` tinyint(1) NOT NULL DEFAULT '1',
  `admin_ID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `approve_users`
--

INSERT INTO `approve_users` (`approve_ID`, `user_ID`, `approve`, `admin_ID`) VALUES
(1, 1, 1, 4),
(2, 2, 1, 4),
(3, 3, 1, 4),
(4, 4, 1, 1),
(5, 5, 1, 5),
(6, 6, 1, 5),
(7, 7, 0, 2),
(8, 8, 1, 1),
(9, 9, 1, 3),
(10, 10, 0, 1),
(11, 11, 1, 3),
(12, 12, 1, 3),
(13, 13, 1, 1),
(14, 14, 1, 1),
(15, 15, 1, 1),
(16, 16, 1, 1),
(17, 17, 1, 2),
(18, 18, 1, 3),
(19, 19, 1, 4),
(20, 20, 1, 5),
(21, 21, 1, 1),
(22, 22, 1, 2),
(23, 23, 1, 3),
(24, 24, 1, 4),
(25, 25, 1, 5),
(26, 26, 1, 1),
(27, 27, 1, 2),
(28, 28, 1, 3),
(29, 29, 1, 4),
(30, 30, 1, 5),
(31, 31, 1, 1),
(32, 32, 1, 2),
(33, 33, 1, 3),
(34, 34, 1, 4),
(35, 35, 1, 5),
(36, 36, 1, 1),
(37, 37, 1, 2),
(38, 38, 1, 3),
(39, 39, 1, 4),
(40, 40, 1, 5),
(41, 41, 1, 1),
(42, 42, 1, 2),
(43, 43, 1, 3),
(44, 44, 1, 4),
(45, 45, 1, 5),
(46, 46, 1, 1),
(47, 47, 1, 2),
(48, 48, 1, 3),
(49, 49, 1, 4),
(50, 50, 1, 5),
(51, 51, 1, 1),
(52, 52, 1, 2),
(53, 53, 1, 3),
(54, 54, 1, 4),
(55, 55, 1, 5),
(56, 56, 1, 1),
(57, 57, 1, 2),
(58, 58, 1, 3),
(59, 59, 1, 4),
(60, 60, 1, 5),
(61, 61, 1, 1),
(62, 62, 1, 2),
(63, 63, 1, 3),
(64, 64, 1, 4),
(65, 65, 1, 5),
(66, 66, 1, 6),
(67, 67, 1, 7),
(68, 68, 1, 7),
(69, 69, 1, 6),
(70, 70, 1, 5),
(71, 71, 1, 4),
(72, 72, 1, 3),
(73, 73, 1, 2),
(74, 74, 1, 1),
(75, 75, 1, 6),
(76, 76, 1, 7),
(77, 77, 1, 5),
(78, 78, 1, 4),
(79, 79, 1, 3),
(80, 80, 1, 2),
(81, 81, 1, 1),
(82, 82, 1, 6),
(83, 83, 1, 7),
(84, 84, 1, 6),
(85, 85, 1, 7),
(86, 86, 1, 5),
(87, 87, 1, 4),
(88, 88, 1, 3),
(89, 89, 1, 2),
(90, 90, 1, 1),
(91, 91, 1, 6),
(92, 92, 1, 7),
(93, 93, 1, 6),
(94, 94, 1, 7),
(95, 95, 1, 5),
(96, 96, 1, 4),
(97, 97, 1, 3),
(98, 98, 1, 2),
(99, 99, 1, 1),
(100, 100, 1, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approve_users`
--
ALTER TABLE `approve_users`
  ADD PRIMARY KEY (`approve_ID`),
  ADD KEY `fk_approve_users_user` (`user_ID`),
  ADD KEY `fk_approve_users_admin` (`admin_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `approve_users`
--
ALTER TABLE `approve_users`
  MODIFY `approve_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `approve_users`
--
ALTER TABLE `approve_users`
  ADD CONSTRAINT `fk_approve_users_admin` FOREIGN KEY (`admin_ID`) REFERENCES `Admin_info` (`admin_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_approve_users_user` FOREIGN KEY (`user_ID`) REFERENCES `Users` (`user_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
