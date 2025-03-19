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
-- Table structure for table `Admin_info`
--

CREATE TABLE `Admin_info` (
  `admin_ID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Admin_info`
--

INSERT INTO `Admin_info` (`admin_ID`, `name`, `email`, `password`) VALUES
(1, 'shaiza sultana ', 'shaizasultana101@gmail.com', 'Admin1-$%&%$'),
(2, 'johhn louis', 'johhnloui123@gmail.com', 'Admin2-$%&%$'),
(3, 'shizzle ackerman', 'shizzleackerman10@gmail.com', 'Admin3-$%&%$'),
(4, 'levi ackerman', 'leviackerman@hotmail.com', 'Admin4-$%&%$'),
(5, 'michel moon ', 'michelmoonon@gmail.com', 'Admin5-$%&%$'),
(6, 'joey branning', 'joeybranning2011@gmail.com', 'Admin6-$%&%$'),
(7, 'johnny depp', 'jonneydepp90s@gmail.com', 'Admin7-$%&%$');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Admin_info`
--
ALTER TABLE `Admin_info`
  ADD PRIMARY KEY (`admin_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
