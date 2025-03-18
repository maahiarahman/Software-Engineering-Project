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
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_ID` int NOT NULL,
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_ID`, `recipe_id`, `user_id`, `rating`, `comment`, `created_at`) VALUES
(1, 1, 2, 5, 'Perfect balance of spice!', '2025-03-18 15:02:22'),
(2, 2, 3, 4, 'Needed more salt.', '2025-03-18 15:02:22'),
(3, 3, 4, 5, 'Authentic taste, just like home.', '2025-03-18 15:02:22'),
(4, 4, 5, 3, 'A little dry, but good.', '2025-03-18 15:02:22'),
(5, 5, 1, 5, 'Best fufu ever!', '2025-03-18 15:02:22'),
(6, 6, 2, 4, 'Very flavourful.', '2025-03-18 15:02:22'),
(7, 7, 3, 5, 'Soft and delicious.', '2025-03-18 15:02:22'),
(8, 8, 4, 5, 'Crispy and juicy meat.', '2025-03-18 15:02:22'),
(9, 9, 5, 3, 'Could use more spices.', '2025-03-18 15:02:22'),
(10, 10, 1, 5, 'Perfectly grilled!', '2025-03-18 15:02:22'),
(11, 11, 2, 4, 'Nice fusion of flavours.', '2025-03-18 15:02:22'),
(12, 12, 3, 5, 'Loved the creamy texture.', '2025-03-18 15:02:22'),
(13, 13, 4, 5, 'A bit heavy but amazing.', '2025-03-18 15:02:22'),
(14, 14, 5, 4, 'Rich flavours, worth it.', '2025-03-18 15:02:22'),
(15, 15, 1, 5, 'Perfect balance of heat!', '2025-03-18 15:02:22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_ID`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
