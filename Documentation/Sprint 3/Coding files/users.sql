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
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_ID` int NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_ID`, `first_name`, `last_name`, `email`, `date_of_birth`, `age`, `user_password`) VALUES
(1, 'Jennifer', 'Smith', 'jennifer.smith@mail.com', '1995-03-18', 30, 'pass1word'),
(2, 'Carlos', 'OHara', 'carlos.ohara@mail.com', '1982-03-18', 43, 'pass2word'),
(3, 'Stefan', 'Ross', 'stefan.ross@mail.com', '2003-03-18', 22, 'pass3word'),
(4, 'Alice', 'Johnson', 'alice.johnson@mail.com', '1996-06-04', 28, 'pass4word'),
(5, 'Bob', 'Williams', 'bob.williams@mail.com', '1992-07-12', 32, 'pass5word'),
(6, 'Charlotte', 'Jones', 'charlotte.jones@mail.com', '1994-11-19', 30, 'pass6word'),
(7, 'David', 'Brown', 'david.brown@mail.com', '1991-09-03', 33, 'pass7word'),
(8, 'Emma', 'Davis', 'emma.davis@mail.com', '1997-02-28', 28, 'pass8word'),
(9, 'Frank', 'Miller', 'frank.miller@mail.com', '1989-12-05', 35, 'pass9word'),
(10, 'Grace', 'Wilson', 'grace.wilson@mail.com', '1990-01-14', 35, 'pass10word'),
(11, 'Hannah', 'Moore', 'hannah.moore@mail.com', '1992-03-24', 32, 'pass11word'),
(12, 'Ivy', 'Taylor', 'ivy.taylor@mail.com', '1995-09-12', 29, 'pass12word'),
(13, 'Jack', 'Anderson', 'jack.anderson@mail.com', '1993-11-16', 31, 'pass13word'),
(14, 'Kara', 'Thomas', 'kara.thomas@mail.com', '1996-01-25', 29, 'pass14word'),
(15, 'Liam', 'Jackson', 'liam.jackson@mail.com', '1994-08-19', 30, 'pass15word'),
(16, 'Mia', 'White', 'mia.white@mail.com', '1995-05-29', 29, 'pass16word'),
(17, 'Noah', 'Harris', 'noah.harris@mail.com', '1998-07-03', 26, 'pass17word'),
(18, 'Olivia', 'Martin', 'olivia.martin@mail.com', '1999-10-07', 25, 'pass18word'),
(19, 'Paul', 'Thompson', 'paul.thompson@mail.com', '1988-04-16', 36, 'pass19word'),
(20, 'Quinn', 'Garcia', 'quinn.garcia@mail.com', '1997-02-20', 28, 'pass20word'),
(21, 'Riley', 'Martinez', 'riley.martinez@mail.com', '1991-06-15', 33, 'pass21word'),
(22, 'Sophia', 'Roberts', 'sophia.roberts@mail.com', '1993-09-26', 31, 'pass22word'),
(23, 'Tyler', 'Phillips', 'tyler.phillips@mail.com', '1996-12-30', 28, 'pass23word'),
(24, 'Ursula', 'Evans', 'ursula.evans@mail.com', '1990-05-05', 34, 'pass24word'),
(25, 'Vera', 'Clark', 'vera.clark@mail.com', '1994-08-01', 30, 'pass25word'),
(26, 'William', 'Lewis', 'william.lewis@mail.com', '1991-04-13', 33, 'pass26word'),
(27, 'Xander', 'Walker', 'xander.walker@mail.com', '1999-02-22', 26, 'pass27word'),
(28, 'Yara', 'Hall', 'yara.hall@mail.com', '1995-07-16', 29, 'pass28word'),
(29, 'Zachary', 'Allen', 'zachary.allen@mail.com', '1998-11-04', 26, 'pass29word'),
(30, 'Abigail', 'Young', 'abigail.young@mail.com', '1996-12-13', 28, 'pass30word'),
(31, 'Benjamin', 'King', 'benjamin.king@mail.com', '1990-09-05', 34, 'pass31word'),
(32, 'Catherine', 'Scott', 'catherine.scott@mail.com', '1993-08-22', 31, 'pass32word'),
(33, 'Daniel', 'Green', 'daniel.green@mail.com', '1991-12-11', 33, 'pass33word'),
(34, 'Ella', 'Adams', 'ella.adams@mail.com', '1995-05-25', 29, 'pass34word'),
(35, 'Felix', 'Baker', 'felix.baker@mail.com', '1998-04-09', 26, 'pass35word'),
(36, 'Grace', 'Nelson', 'grace.nelson@mail.com', '1999-01-17', 26, 'pass36word'),
(37, 'Harrison', 'Carter', 'harrison.carter@mail.com', '1992-10-31', 32, 'pass37word'),
(38, 'Isabella', 'Mitchell', 'isabella.mitchell@mail.com', '1994-02-18', 31, 'pass38word'),
(39, 'Jacob', 'Perez', 'jacob.perez@mail.com', '1997-05-06', 27, 'pass39word'),
(40, 'Katherine', 'Robinson', 'katherine.robinson@mail.com', '1993-08-02', 31, 'pass40word'),
(41, 'Leo', 'Gonzalez', 'leo.gonzalez@mail.com', '1996-01-07', 29, 'pass41word'),
(42, 'Mason', 'Lopez', 'mason.lopez@mail.com', '1994-10-20', 30, 'pass42word'),
(43, 'Nina', 'Hughes', 'nina.hughes@mail.com', '1991-11-15', 33, 'pass43word'),
(44, 'Oscar', 'Wright', 'oscar.wright@mail.com', '1997-09-22', 27, 'pass44word'),
(45, 'Piper', 'Hill', 'piper.hill@mail.com', '1999-06-12', 25, 'pass45word'),
(46, 'Quincy', 'Gomez', 'quincy.gomez@mail.com', '1998-03-01', 27, 'pass46word'),
(47, 'Rebecca', 'Greenwood', 'rebecca.greenwood@mail.com', '1995-12-14', 29, 'pass47word'),
(48, 'Sam', 'Stewart', 'sam.stewart@mail.com', '1996-07-29', 28, 'pass48word'),
(49, 'Tara', 'Morris', 'tara.morris@mail.com', '1994-04-18', 30, 'pass49word'),
(50, 'Ulysses', 'Price', 'ulysses.price@mail.com', '1997-08-31', 27, 'pass50word'),
(51, 'Vanessa', 'Russell', 'vanessa.russell@mail.com', '1999-02-10', 26, 'pass51word'),
(52, 'Willow', 'Simmons', 'willow.simmons@mail.com', '1992-10-02', 32, 'pass52word'),
(53, 'Xena', 'Butler', 'xena.butler@mail.com', '1991-05-17', 33, 'pass53word'),
(54, 'Yasmine', 'Graham', 'yasmine.graham@mail.com', '1995-01-14', 30, 'pass54word'),
(55, 'Zane', 'Bennett', 'zane.bennett@mail.com', '1998-04-25', 26, 'pass55word'),
(56, 'Adam', 'Sullivan', 'adam.sullivan@mail.com', '1994-06-19', 30, 'pass56word'),
(57, 'Brooke', 'Bates', 'brooke.bates@mail.com', '1992-08-30', 32, 'pass57word'),
(58, 'Carl', 'Griffin', 'carl.griffin@mail.com', '1995-12-22', 29, 'pass58word'),
(59, 'Diana', 'Ramirez', 'diana.ramirez@mail.com', '1997-04-09', 27, 'pass59word'),
(60, 'Eli', 'Marshall', 'eli.marshall@mail.com', '1990-03-01', 35, 'pass60word'),
(61, 'Fiona', 'Fox', 'fiona.fox@mail.com', '1999-08-04', 25, 'pass61word'),
(62, 'George', 'Diaz', 'george.diaz@mail.com', '1996-02-26', 29, 'pass62word'),
(63, 'Holly', 'Curtis', 'holly.curtis@mail.com', '1994-07-18', 30, 'pass63word'),
(64, 'Isaac', 'Reed', 'isaac.reed@mail.com', '1997-11-23', 27, 'pass64word'),
(65, 'Jade', 'Morgan', 'jade.morgan@mail.com', '1999-09-14', 25, 'pass65word'),
(66, 'Kyle', 'Fisher', 'kyle.fisher@mail.com', '1992-03-13', 33, 'pass66word'),
(67, 'Leah', 'Woods', 'leah.woods@mail.com', '1991-12-28', 33, 'pass67word'),
(68, 'Max', 'Henderson', 'max.henderson@mail.com', '1994-11-17', 30, 'pass68word'),
(69, 'Nora', 'Sanders', 'nora.sanders@mail.com', '1996-08-11', 28, 'pass69word'),
(70, 'Owen', 'Campbell', 'owen.campbell@mail.com', '1993-12-02', 31, 'pass70word'),
(71, 'Patricia', 'Parker', 'patricia.parker@mail.com', '1998-01-28', 27, 'pass71word'),
(72, 'Quinton', 'Collins', 'quinton.collins@mail.com', '1999-07-19', 25, 'pass72word'),
(73, 'Rita', 'Burns', 'rita.burns@mail.com', '1992-05-07', 32, 'pass73word'),
(74, 'Seth', 'Jenkins', 'seth.jenkins@mail.com', '1996-09-09', 28, 'pass74word'),
(75, 'Tracy', 'Powell', 'tracy.powell@mail.com', '1998-02-12', 27, 'pass75word'),
(76, 'Umar', 'Long', 'umar.long@mail.com', '1993-10-16', 31, 'pass76word'),
(77, 'Vince', 'Russell', 'vince.russell@mail.com', '1997-04-27', 27, 'pass77word'),
(78, 'Wendy', 'Lee', 'wendy.lee@mail.com', '1995-03-05', 30, 'pass78word'),
(79, 'Xander', 'Bishop', 'xander.bishop@mail.com', '1996-05-23', 28, 'pass79word'),
(80, 'Yvonne', 'Cameron', 'yvonne.cameron@mail.com', '1992-02-14', 33, 'pass80word'),
(81, 'Zara', 'Knight', 'zara.knight@mail.com', '1999-06-27', 25, 'pass81word'),
(82, 'Ashley', 'James', 'ashley.james@mail.com', '1993-07-04', 31, 'pass82word'),
(83, 'Brett', 'Wagner', 'brett.wagner@mail.com', '1994-09-30', 30, 'pass83word'),
(84, 'Clara', 'Ford', 'clara.ford@mail.com', '1991-01-02', 34, 'pass84word'),
(85, 'Damien', 'Perry', 'damien.perry@mail.com', '1997-08-15', 27, 'pass85word'),
(86, 'Eva', 'Rose', 'eva.rose@mail.com', '1992-10-29', 32, 'pass86word'),
(87, 'Felicia', 'Peters', 'felicia.peters@mail.com', '1993-04-20', 31, 'pass87word'),
(88, 'Gage', 'Alexander', 'gage.alexander@mail.com', '1996-12-03', 28, 'pass88word'),
(89, 'Hope', 'Brooks', 'hope.brooks@mail.com', '1997-10-21', 27, 'pass89word'),
(90, 'Iris', 'Hunter', 'iris.hunter@mail.com', '1999-04-05', 25, 'pass90word'),
(91, 'Jesse', 'Gordon', 'jesse.gordon@mail.com', '1995-06-18', 29, 'pass91word'),
(92, 'Kelsey', 'Grantt', 'kelsey.grantt@mail.com', '1994-03-11', 31, 'pass92word'),
(93, 'Landon', 'Murray', 'landon.murray@mail.com', '1993-07-30', 31, 'pass93word'),
(94, 'Megan', 'Collier', 'megan.collier@mail.com', '1996-01-22', 29, 'pass94word'),
(95, 'Noelle', 'Mcdonald', 'noelle.mcdonald@mail.com', '1999-10-04', 25, 'pass95word'),
(96, 'Omar', 'Edwards', 'omar.edwards@mail.com', '1997-06-30', 27, 'pass96word'),
(97, 'Penelope', 'Knight', 'penelope.knight@mail.com', '1994-05-21', 30, 'pass97word'),
(98, 'Quinn', 'Cameron', 'quinn.cameron@mail.com', '1996-09-28', 28, 'pass98word'),
(99, 'Roxanne', 'Stevens', 'roxanne.stevens@mail.com', '1992-01-03', 33, 'pass99word'),
(100, 'Sandy', 'Morris', 'sandy.morris@mail.com', '1995-04-17', 29, 'pass100word');

--
-- Triggers `users`
--
DELIMITER $$
CREATE TRIGGER `before_users_insert` BEFORE INSERT ON `users` FOR EACH ROW SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE())
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_users_update` BEFORE UPDATE ON `users` FOR EACH ROW SET NEW.age = TIMESTAMPDIFF(YEAR, NEW.date_of_birth, CURDATE())
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
