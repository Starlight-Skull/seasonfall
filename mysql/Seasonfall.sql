-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 10, 2022 at 04:07 PM
-- Server version: 8.0.27
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Seasonfall`
--
CREATE DATABASE IF NOT EXISTS `Seasonfall` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `Seasonfall`;

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
CREATE TABLE `scores` (
  `id` int NOT NULL,
  `user` int NOT NULL,
  `timeTaken` int DEFAULT NULL,
  `kills` int DEFAULT NULL,
  `attacks` int DEFAULT NULL,
  `attacksHit` int DEFAULT NULL,
  `damageTaken` int DEFAULT NULL,
  `damageDealt` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `user`, `timeTaken`, `kills`, `attacks`, `attacksHit`, `damageTaken`, `damageDealt`) VALUES
(1, 1, 144, 10, 72, 43, 170, 645),
(2, 1, 128, 10, 65, 45, 120, 675),
(3, 1, 1396, 10, 92, 46, 180, 690),
(4, 1, 73, 7, 43, 42, 150, 630),
(5, 1, 135, 10, 99, 52, 60, 780),
(6, 1, 106, 10, 72, 46, 90, 690),
(7, 1, 63, 4, 30, 29, 150, 435),
(8, 1, 60, 2, 21, 12, 140, 180),
(9, 1, 92, 10, 69, 43, 100, 645),
(10, 2, 101, 10, 65, 44, 60, 660),
(11, 2, 85, 10, 57, 45, 60, 675),
(12, 2, 96, 10, 70, 42, 40, 630),
(13, 2, 83, 10, 60, 47, 100, 705),
(14, 2, 100, 10, 63, 42, 100, 630),
(15, 2, 56, 1, 19, 16, 130, 240),
(16, 2, 86, 10, 62, 43, 90, 645),
(17, 2, 126, 10, 64, 42, 40, 630),
(19, 2, 97, 10, 67, 45, 20, 675),
(20, 2, 88, 10, 57, 43, 50, 645),
(21, 2, 129, 10, 86, 45, 90, 675),
(22, 2, 112, 10, 77, 45, 160, 675),
(23, 2, 42, 5, 41, 29, 140, 435),
(24, 2, 60, 6, 60, 38, 160, 570),
(25, 2, 28, 0, 15, 14, 130, 210),
(26, 2, 90, 5, 37, 29, 180, 435),
(27, 1, 82, 0, 21, 15, 180, 225),
(28, 1, 72, 10, 66, 42, 60, 630),
(29, 2, 101, 0, 4, 0, 120, 0),
(30, 2, 43, 0, 8, 5, 140, 75),
(31, 2, 115, 10, 82, 48, 170, 720),
(32, 2, 158, 0, 17, 5, 140, 75),
(33, 2, 217, 9, 90, 45, 240, 675),
(34, 2, 117, 2, 73, 12, 140, 180);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `key` varchar(32) NOT NULL,
  `location` varchar(32) NOT NULL,
  `first_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `key`, `location`, `first_date`) VALUES
(1, 'Player 1', 'b16520902b41fb903dba979964f07a4a489f38c228b41043b5d872c412239097', '3298c25e5de1ab02b9d7e83bb1284cbd', 'Ghent,BE', '2021-11-30'),
(2, 'StarlightSkull', '0e742a4fd137b2136f8725a72961f555b9398bcf0c3809ca1c588ee5e0c774d8', '3298c25e5de1ab02b9d7e83bb1284cbd', 'Zomergem,BE', '2022-01-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
