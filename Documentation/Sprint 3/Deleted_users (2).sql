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
-- Table structure for table `Deleted_users`
--

CREATE TABLE `Deleted_users` (
  `delete_ID` int NOT NULL,
  `user_ID` int NOT NULL,
  `admin_ID` int DEFAULT NULL,
  `delete_states` enum('deleted','rejected') NOT NULL DEFAULT 'deleted',
  `delete_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Deleted_users`
--

INSERT INTO `Deleted_users` (`delete_ID`, `user_ID`, `admin_ID`, `delete_states`, `delete_date`) VALUES
(1, 7, 1, 'rejected', '2025-03-12 09:56:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Deleted_users`
--
ALTER TABLE `Deleted_users`
  ADD PRIMARY KEY (`delete_ID`),
  ADD KEY `fk_deleted_users_user` (`user_ID`),
  ADD KEY `fk_deleted_users_admin` (`admin_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Deleted_users`
--
ALTER TABLE `Deleted_users`
  MODIFY `delete_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Deleted_users`
--
ALTER TABLE `Deleted_users`
  ADD CONSTRAINT `fk_deleted_users_admin` FOREIGN KEY (`admin_ID`) REFERENCES `Admin_info` (`admin_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_deleted_users_user` FOREIGN KEY (`user_ID`) REFERENCES `Users` (`user_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
