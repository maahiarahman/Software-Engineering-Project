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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`recipe_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `recipe_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
