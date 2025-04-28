-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 18, 2025 at 10:57 PM
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
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_ID` int NOT NULL,
  `user_ID` int DEFAULT NULL,
  `recipe_ID` int DEFAULT NULL,
  `date_posted` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_ID`, `user_ID`, `recipe_ID`, `date_posted`) VALUES
(1, 1, 1, '2025-03-17'),
(2, 1, 21, '2025-03-17'),
(3, 1, 26, '2025-03-17'),
(4, 1, 16, '2025-03-17'),
(5, 1, 31, '2025-03-17'),
(6, 1, 11, '2025-03-17'),
(7, 1, 42, '2025-03-17'),
(8, 1, 46, '2025-03-17'),
(9, 1, 6, '2025-03-17'),
(10, 1, 51, '2025-03-17'),
(11, 2, 27, '2025-03-17'),
(12, 2, 7, '2025-03-17'),
(13, 2, 17, '2025-03-17'),
(14, 2, 22, '2025-03-17'),
(15, 2, 12, '2025-03-17'),
(16, 2, 2, '2025-03-17'),
(17, 2, 42, '2025-03-17'),
(18, 2, 52, '2025-03-17'),
(19, 2, 31, '2025-03-17'),
(20, 2, 37, '2025-03-17'),
(21, 2, 47, '2025-03-17'),
(22, 3, 33, '2025-03-17'),
(23, 3, 48, '2025-03-17'),
(24, 3, 13, '2025-03-17'),
(25, 3, 8, '2025-03-17'),
(26, 3, 28, '2025-03-17'),
(27, 3, 18, '2025-03-17'),
(28, 3, 53, '2025-03-17'),
(29, 3, 23, '2025-03-17'),
(30, 4, 49, '2025-03-17'),
(31, 4, 4, '2025-03-17'),
(32, 4, 44, '2025-03-17'),
(33, 4, 54, '2025-03-17'),
(34, 4, 39, '2025-03-17'),
(35, 4, 34, '2025-03-17'),
(36, 4, 14, '2025-03-17'),
(37, 4, 29, '2025-03-17'),
(38, 4, 24, '2025-03-17'),
(39, 4, 19, '2025-03-17'),
(40, 5, 10, '2025-03-17'),
(41, 5, 40, '2025-03-17'),
(42, 5, 20, '2025-03-17'),
(43, 5, 35, '2025-03-17'),
(44, 5, 45, '2025-03-17'),
(45, 5, 15, '2025-03-17'),
(46, 5, 30, '2025-03-17'),
(47, 5, 50, '2025-03-17'),
(48, 5, 5, '2025-03-17'),
(49, 5, 25, '2025-03-17'),
(50, 5, 55, '2025-03-17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_ID`),
  ADD KEY `user_ID` (`user_ID`),
  ADD KEY `recipe_ID` (`recipe_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `users` (`user_ID`),
  ADD CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`recipe_ID`) REFERENCES `recipes` (`recipe_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
