-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2017 at 08:55 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `role`, `phone`, `email`, `password`) VALUES
(1, 'Ido', 'owner', '052', 'a@a', '1234'),
(2, 'Amir', 'manager', '052', 'a@a', '1234'),
(3, 'Eli', 'sales', '052', 'a@a', '1234'),
(4, 'Yaniv', 'sales', '052', 'y@a', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `description`, `image`) VALUES
(5, 'hebrew', '&#1513;&#1500;&#1493;&#1501; &#1506;&#1500;&#1497;&#1499;&#1501;', ''),
(46, 'math', '1', ''),
(63, 'gaming', '2', ''),
(70, 'history', '1234', ''),
(73, 'english2', '3', ''),
(92, 'JOKER', '12345', '');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enroll_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`enroll_id`, `student_id`, `course_id`) VALUES
(209, 2, 46),
(213, 2, 70),
(23, 2, 73),
(33, 13, 5),
(194, 13, 46),
(195, 13, 63),
(39, 13, 70),
(40, 13, 73),
(148, 13, 92),
(78, 24, 46),
(44, 24, 70),
(45, 24, 73),
(150, 77, 5),
(151, 77, 46),
(152, 77, 63),
(160, 77, 70),
(155, 77, 73),
(163, 77, 92),
(167, 78, 73),
(165, 79, 46),
(166, 79, 63),
(176, 83, 46),
(177, 83, 63),
(216, 83, 70),
(184, 84, 92),
(191, 86, 63),
(192, 86, 70),
(193, 86, 73),
(202, 87, 63),
(203, 87, 70);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `phone`, `email`, `image`) VALUES
(2, 'hofit', '', '', ''),
(13, 'matan', '321', 'wae', ''),
(24, 'gamli', '1234', '12345', ''),
(77, 'maya2', '111111111111', '1111111@111111', ''),
(78, 'chen', '1111111111113', '1111111@111111', ''),
(79, 'moshe', '1111111111113', '1111111@111111', ''),
(82, 'dan', '1111111111113', '1111111@111111', ''),
(83, 'chehzki', '1234', '1234', ''),
(84, 'alex', '', '', ''),
(85, 'tal', '1234', 'hof@hof', ''),
(86, 'hen', '1111111', '111111', ''),
(87, 'sveta', '321', 'wae', ''),
(88, 'yamit', '', '1234', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enroll_id`),
  ADD UNIQUE KEY `student_id` (`student_id`,`course_id`),
  ADD KEY `course_id_2` (`course_id`),
  ADD KEY `student_id_2` (`student_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enroll_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
