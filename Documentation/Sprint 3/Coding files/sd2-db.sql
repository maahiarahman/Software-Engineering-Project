-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 18, 2025 at 05:02 PM
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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`) VALUES
(1, 'African'),
(2, 'Asian'),
(3, 'European'),
(4, 'Middle Eastern'),
(5, 'North American');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `favorite_id` int NOT NULL,
  `user_id` int NOT NULL,
  `recipe_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`favorite_id`, `user_id`, `recipe_id`, `created_at`) VALUES
(1, 1, 3, '2025-03-18 13:49:09'),
(2, 2, 5, '2025-03-18 13:49:09'),
(3, 3, 1, '2025-03-18 13:49:09'),
(4, 4, 8, '2025-03-18 13:49:09'),
(5, 5, 2, '2025-03-18 13:49:09'),
(6, 1, 11, '2025-03-18 13:49:09'),
(7, 2, 9, '2025-03-18 13:49:09'),
(8, 3, 7, '2025-03-18 13:49:09'),
(9, 4, 4, '2025-03-18 13:49:09'),
(10, 5, 6, '2025-03-18 13:49:09');

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

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `ingredients` text NOT NULL,
  `instructions` text NOT NULL,
  `category_id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`recipe_id`, `user_id`, `name`, `description`, `ingredients`, `instructions`, `category_id`, `image_url`, `created_at`) VALUES
(1, 1, 'Jollof Rice', 'Spicy tomato-based rice dish.', 'Rice, Tomatoes, Peppers, Onions, Spices', 'Cook rice with sauce.', 1, NULL, '2025-03-18 14:54:15'),
(2, 2, 'Egusi Soup', 'Soup made with ground melon seeds.', 'Egusi, Palm Oil, Meat, Vegetables', 'Cook with broth.', 1, NULL, '2025-03-18 14:54:15'),
(3, 3, 'Pounded Yam', 'Mashed yam served with soup.', 'Yam, Water', 'Boil and pound.', 1, NULL, '2025-03-18 14:54:15'),
(4, 4, 'Bunny Chow', 'Bread bowl filled with curry.', 'Bread, Curry, Meat', 'Fill bread with curry.', 1, NULL, '2025-03-18 14:54:15'),
(5, 5, 'Fufu', 'Dough-like staple.', 'Cassava, Plantains', 'Boil and pound.', 1, NULL, '2025-03-18 14:54:15'),
(6, 1, 'Pepper Soup', 'Spicy broth-based soup.', 'Meat, Peppers, Spices', 'Simmer ingredients.', 1, NULL, '2025-03-18 14:54:15'),
(7, 2, 'Chapati', 'Flatbread from East Africa.', 'Flour, Water, Oil', 'Knead, roll, cook.', 1, NULL, '2025-03-18 14:54:15'),
(8, 3, 'Suya', 'Spicy grilled meat skewers.', 'Beef, Suya Spice', 'Grill skewers.', 1, NULL, '2025-03-18 14:54:15'),
(9, 4, 'Moi Moi', 'Steamed bean pudding.', 'Beans, Peppers, Onions', 'Blend, steam.', 1, NULL, '2025-03-18 14:54:15'),
(10, 5, 'Kenyan Nyama Choma', 'Grilled meat dish.', 'Meat, Spices', 'Marinate, grill.', 1, NULL, '2025-03-18 14:54:15'),
(11, 1, 'Bobotie', 'Spiced minced meat baked with an egg-based topping.', 'Minced Meat, Eggs, Bread', 'Bake meat with topping.', 1, NULL, '2025-03-18 14:54:15'),
(12, 2, 'Kachumbari', 'Fresh tomato and onion salad.', 'Tomatoes, Onions, Chili, Lime', 'Chop and mix.', 1, NULL, '2025-03-18 14:54:15'),
(13, 3, 'Biltong', 'Dried cured meat snack.', 'Beef, Vinegar, Spices', 'Dry and cure.', 1, NULL, '2025-03-18 14:54:15'),
(14, 4, 'Chakalaka', 'Spicy vegetable relish.', 'Carrots, Peppers, Beans', 'Cook until tender.', 1, NULL, '2025-03-18 14:54:15'),
(15, 5, 'Maharagwe', 'Kenyan bean stew.', 'Beans, Coconut Milk, Spices', 'Simmer with coconut milk.', 1, NULL, '2025-03-18 14:54:15'),
(16, 1, 'Cape Malay Curry', 'Fragrant Cape Town curry.', 'Meat, Curry Powder, Tomatoes', 'Cook until tender.', 1, NULL, '2025-03-18 14:54:15'),
(17, 2, 'Pilau Rice', 'Spiced rice dish.', 'Rice, Spices, Meat', 'Cook rice with spices.', 1, NULL, '2025-03-18 14:54:15'),
(18, 3, 'Boerewors', 'South African spiced sausage.', 'Beef, Pork, Spices', 'Grill over fire.', 1, NULL, '2025-03-18 14:54:15'),
(19, 4, 'Mandazi', 'Sweet fried dough.', 'Flour, Coconut Milk, Sugar', 'Fry until golden.', 1, NULL, '2025-03-18 14:54:15'),
(20, 5, 'Tieboudienne', 'Senegalese fish and rice dish.', 'Fish, Rice, Tomatoes', 'Cook together.', 1, NULL, '2025-03-18 14:54:15'),
(21, 1, 'Vegemite Toast', 'Australian breakfast staple.', 'Bread, Butter, Vegemite', 'Spread on toast.', 2, NULL, '2025-03-18 14:54:15'),
(22, 2, 'Pavlova', 'Meringue-based dessert.', 'Egg Whites, Sugar, Fruit', 'Bake and decorate.', 2, NULL, '2025-03-18 14:54:15'),
(23, 3, 'Meat Pie', 'Classic Aussie meat pie.', 'Pastry, Minced Meat, Gravy', 'Bake until golden.', 2, NULL, '2025-03-18 14:54:15'),
(24, 4, 'Lamingtons', 'Chocolate and coconut sponge cake.', 'Cake, Chocolate, Coconut', 'Dip and coat.', 2, NULL, '2025-03-18 14:54:15'),
(25, 5, 'Barramundi', 'Grilled white fish.', 'Barramundi Fish, Lemon, Spices', 'Grill and serve.', 2, NULL, '2025-03-18 14:54:15'),
(26, 1, 'Damper', 'Traditional bush bread.', 'Flour, Water, Salt', 'Bake over fire.', 2, NULL, '2025-03-18 14:54:15'),
(27, 2, 'Kangaroo Steak', 'Lean game meat.', 'Kangaroo Meat, Herbs', 'Pan-sear to perfection.', 2, NULL, '2025-03-18 14:54:15'),
(28, 3, 'Fairy Bread', 'Children’s party treat.', 'Bread, Butter, Sprinkles', 'Spread and sprinkle.', 2, NULL, '2025-03-18 14:54:15'),
(29, 4, 'Balmain Bugs', 'Grilled slipper lobsters.', 'Lobster, Butter, Lemon', 'Grill and baste.', 2, NULL, '2025-03-18 14:54:15'),
(30, 5, 'Pumpkin Scones', 'Sweet Australian scones.', 'Flour, Pumpkin, Sugar', 'Bake until golden.', 2, NULL, '2025-03-18 14:54:15'),
(31, 1, 'Sushi Rolls', 'Japanese vinegared rice rolls.', 'Rice, Fish, Seaweed', 'Roll and slice.', 3, NULL, '2025-03-18 14:54:15'),
(32, 2, 'Pad Thai', 'Thai stir-fried noodles.', 'Noodles, Shrimp, Peanuts', 'Stir-fry noodles.', 3, NULL, '2025-03-18 14:54:15'),
(33, 3, 'Tandoori Chicken', 'Marinated chicken cooked in tandoor.', 'Chicken, Yogurt, Spices', 'Grill in clay oven.', 3, NULL, '2025-03-18 14:54:15'),
(34, 4, 'Laksa', 'Spicy noodle soup.', 'Noodles, Coconut Milk, Prawns', 'Simmer and serve.', 3, NULL, '2025-03-18 14:54:15'),
(35, 5, 'Dim Sum', 'Chinese bite-sized dumplings.', 'Dough, Pork, Shrimp', 'Steam and serve.', 3, NULL, '2025-03-18 14:54:15'),
(36, 1, 'Pho', 'Vietnamese noodle soup.', 'Beef, Rice Noodles, Herbs', 'Simmer broth, add noodles.', 3, NULL, '2025-03-18 14:54:15'),
(37, 2, 'Classic Pasta', 'Italian pasta with sauce.', 'Pasta, Eggs, Cheese', 'Boil and mix.', 4, NULL, '2025-03-18 14:54:15'),
(38, 3, 'French Croissant', 'Flaky pastry.', 'Flour, Butter, Yeast', 'Bake to golden.', 4, NULL, '2025-03-18 14:54:15'),
(39, 4, 'Schnitzel', 'Breaded fried meat cutlet.', 'Pork, Bread Crumbs, Egg', 'Fry until crispy.', 4, NULL, '2025-03-18 14:54:15'),
(40, 5, 'Borscht', 'Beetroot soup.', 'Beets, Cabbage, Beef', 'Simmer and serve.', 4, NULL, '2025-03-18 14:54:15'),
(41, 1, 'Pierogi', 'Polish dumplings.', 'Flour, Potatoes, Cheese', 'Boil and pan-fry.', 4, NULL, '2025-03-18 14:54:15'),
(42, 2, 'Shawarma', 'Grilled spiced meat.', 'Chicken, Yogurt, Garlic', 'Marinate and grill.', 5, NULL, '2025-03-18 14:54:15'),
(43, 3, 'Hummus', 'Chickpea dip.', 'Chickpeas, Tahini, Lemon', 'Blend ingredients.', 5, NULL, '2025-03-18 14:54:15'),
(44, 4, 'Falafel', 'Deep-fried chickpea patties.', 'Chickpeas, Herbs, Spices', 'Blend, shape, fry.', 5, NULL, '2025-03-18 14:54:15'),
(45, 5, 'Baklava', 'Sweet pastry with nuts.', 'Phyllo Dough, Honey, Nuts', 'Layer and bake.', 5, NULL, '2025-03-18 14:54:15'),
(46, 1, 'Tabbouleh', 'Fresh herb and grain salad.', 'Parsley, Bulgur, Lemon', 'Mix ingredients.', 5, NULL, '2025-03-18 14:54:15'),
(47, 2, 'BBQ Ribs', 'Grilled ribs with sauce.', 'Pork Ribs, BBQ Sauce', 'Grill and baste.', 6, NULL, '2025-03-18 14:54:15'),
(48, 3, 'Mac & Cheese', 'Creamy cheesy pasta.', 'Pasta, Cheese, Milk', 'Bake to golden.', 6, NULL, '2025-03-18 14:54:15'),
(49, 4, 'Buffalo Wings', 'Spicy chicken wings.', 'Chicken Wings, Hot Sauce', 'Fry and toss in sauce.', 6, NULL, '2025-03-18 14:54:15'),
(50, 5, 'Clam Chowder', 'Creamy seafood soup.', 'Clams, Potatoes, Cream', 'Simmer to perfection.', 6, NULL, '2025-03-18 14:54:15'),
(51, 1, 'Pecan Pie', 'Sweet nut-filled pie.', 'Pecans, Sugar, Butter', 'Bake until set.', 6, NULL, '2025-03-18 14:54:15'),
(52, 2, 'Empanadas', 'Stuffed pastry turnovers.', 'Flour, Meat, Spices', 'Bake or fry.', 7, NULL, '2025-03-18 14:54:15'),
(53, 3, 'Arepas', 'Cornmeal flatbreads.', 'Cornmeal, Water, Salt', 'Grill until crisp.', 7, NULL, '2025-03-18 14:54:15'),
(54, 4, 'Ceviche', 'Marinated raw seafood.', 'Fish, Lime Juice, Cilantro', 'Marinate and serve.', 7, NULL, '2025-03-18 14:54:15'),
(55, 5, 'Feijoada', 'Brazilian black bean stew.', 'Black Beans, Pork, Sausage', 'Slow cook ingredients.', 7, NULL, '2025-03-18 14:54:15'),
(56, 1, 'Dulce de Leche', 'Caramelized milk dessert.', 'Milk, Sugar, Vanilla', 'Simmer and cool.', 7, NULL, '2025-03-18 14:54:15');

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
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`favorite_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`recipe_id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_ID`),
  ADD KEY `user_ID` (`user_ID`),
  ADD KEY `recipe_ID` (`recipe_ID`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_ID`),
  ADD KEY `recipe_id` (`recipe_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `favorite_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE;

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
