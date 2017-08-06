-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2017 at 09:13 PM
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
  `image` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `role`, `phone`, `email`, `image`, `password`) VALUES
(1, 'ido', 'owner', '666', 'imTheBoss@soUCantEditMe.com', 'Jellyfish.jpg', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'Amir', 'sales', '052', '1234@1234', 'Tulips.jpg', '81dc9bdb52d04dc20036dbd8313ed055'),
(6, 'oferGolib', 'manager', '2', 'yaGever@giveMeAGoodGrade.99', 'Penguins.jpg', '81dc9bdb52d04dc20036dbd8313ed055'),
(8, 'thor2', 'manager', '999999', 'thor@asgard.odinForce.com', 'thor.jpg', '81dc9bdb52d04dc20036dbd8313ed055');

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
(5, 'hebrew', '', 'lomdinivrit.png'),
(46, 'math', '333', 'math.jpg'),
(63, 'gaming', '2222', 'unnamed.jpg'),
(70, 'history', '1234', 'history.jpg'),
(73, 'english', 'bal bal bla ', 'english.jpg'),
(92, 'JOKER', 'hehehe funny course', 'maxresdefault.jpg'),
(106, 'jquery', 'please add some student for me!', 'jquery_icon.png');

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
(165, 79, 46),
(166, 79, 63),
(236, 82, 5),
(237, 82, 46),
(176, 83, 46),
(177, 83, 63),
(216, 83, 70),
(272, 83, 73),
(184, 84, 92);

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
(13, 'matan', '321', '111', 'Penguins.jpg'),
(24, 'gamli', '1234', '12345', 'Lighthouse.jpg'),
(77, 'maya2', '1111111111112', '2111@1112.il', 'Chrysanthemum.jpg'),
(79, 'moshe2', '1111111111113', '3311@111111.co.il', 'Jellyfish.jpg'),
(82, 'dannnnn2', '1111111111113', '123@gmail.com', 'Tulips.jpg'),
(83, 'chehzki', '1234', '1234@1234.com', 'Koala.jpg'),
(84, 'alex1', '', '222@5552.com', 'Koala.jpg');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enroll_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;
--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;
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
