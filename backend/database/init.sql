-- Database: QuanLyXeBuyt
-- This script creates the database and all required tables in correct order

-- Create database if not exists
DROP DATABASE IF EXISTS QuanLyXeBuyt;
CREATE DATABASE IF NOT EXISTS QuanLyXeBuyt;
USE QuanLyXeBuyt;

-- Drop all tables first to ensure clean creation (be careful in production!)
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `attendances`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `bus_trackings`;
DROP TABLE IF EXISTS `schedules`;
DROP TABLE IF EXISTS `route_stops`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `stops`;
DROP TABLE IF EXISTS `routes`;
DROP TABLE IF EXISTS `buses`;
DROP TABLE IF EXISTS `users`;

SET FOREIGN_KEY_CHECKS = 1;

-- Create tables in correct order (no foreign keys first)

-- Users table (no foreign keys)
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('admin','dispatch','driver','parent') NOT NULL DEFAULT 'parent',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `avatar` varchar(255) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `refresh_token` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Buses table (references users for driver)
CREATE TABLE `buses` (
  `id` char(36) NOT NULL,
  `bus_number` varchar(20) NOT NULL,
  `license_plate` varchar(15) NOT NULL,
  `capacity` int NOT NULL,
  `model` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `status` enum('active','maintenance','inactive') DEFAULT 'active',
  `driver_id` char(36) DEFAULT NULL,
  `current_lat` decimal(10,8) DEFAULT NULL,
  `current_lng` decimal(11,8) DEFAULT NULL,
  `last_location_update` datetime DEFAULT NULL,
  `fuel_level` decimal(5,2) DEFAULT NULL,
  `mileage` int DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bus_number` (`bus_number`),
  UNIQUE KEY `license_plate` (`license_plate`),
  KEY `driver_id` (`driver_id`),
  CONSTRAINT `buses_driver_fk` FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Routes table (no foreign keys)
CREATE TABLE `routes` (
  `id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(20) NOT NULL,
  `description` text,
  `start_location` varchar(255) NOT NULL,
  `end_location` varchar(255) NOT NULL,
  `distance` decimal(8,2) DEFAULT NULL,
  `estimated_duration` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `color` varchar(7) DEFAULT '#3B82F6',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Stops table (no foreign keys)
CREATE TABLE `stops` (
  `id` char(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `type` enum('pickup','dropoff','both') DEFAULT 'both',
  `is_active` tinyint(1) DEFAULT '1',
  `landmarks` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Route_stops junction table
CREATE TABLE `route_stops` (
  `id` char(36) NOT NULL,
  `route_id` char(36) NOT NULL,
  `stop_id` char(36) NOT NULL,
  `sequence` int NOT NULL,
  `estimated_time` int DEFAULT NULL,
  `distance` decimal(8,2) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `route_stop_unique` (`route_id`,`stop_id`),
  UNIQUE KEY `route_sequence_unique` (`route_id`,`sequence`),
  KEY `stop_id` (`stop_id`),
  CONSTRAINT `route_stops_route_fk` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`),
  CONSTRAINT `route_stops_stop_fk` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Students table
CREATE TABLE `students` (
  `id` char(36) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `grade` varchar(10) DEFAULT NULL,
  `class` varchar(20) DEFAULT NULL,
  `parent_id` char(36) NOT NULL,
  `bus_id` char(36) DEFAULT NULL,
  `route_id` char(36) DEFAULT NULL,
  `pickup_stop_id` char(36) DEFAULT NULL,
  `dropoff_stop_id` char(36) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `emergency_contact` varchar(20) DEFAULT NULL,
  `medical_info` text,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`),
  KEY `parent_id` (`parent_id`),
  KEY `bus_id` (`bus_id`),
  KEY `route_id` (`route_id`),
  KEY `pickup_stop_id` (`pickup_stop_id`),
  KEY `dropoff_stop_id` (`dropoff_stop_id`),
  CONSTRAINT `students_parent_fk` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`),
  CONSTRAINT `students_bus_fk` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`),
  CONSTRAINT `students_route_fk` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`),
  CONSTRAINT `students_pickup_stop_fk` FOREIGN KEY (`pickup_stop_id`) REFERENCES `stops` (`id`),
  CONSTRAINT `students_dropoff_stop_fk` FOREIGN KEY (`dropoff_stop_id`) REFERENCES `stops` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Schedules table
CREATE TABLE `schedules` (
  `id` char(36) NOT NULL,
  `bus_id` char(36) NOT NULL,
  `route_id` char(36) NOT NULL,
  `type` enum('pickup','dropoff') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time DEFAULT NULL,
  `days` json NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `notes` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `schedule_unique` (`bus_id`,`route_id`,`type`,`start_time`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `schedules_bus_fk` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`),
  CONSTRAINT `schedules_route_fk` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bus_trackings table
CREATE TABLE `bus_trackings` (
  `id` char(36) NOT NULL,
  `bus_id` char(36) NOT NULL,
  `driver_id` char(36) DEFAULT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `speed` decimal(5,2) DEFAULT NULL,
  `heading` decimal(5,2) DEFAULT NULL,
  `accuracy` decimal(8,2) DEFAULT NULL,
  `status` enum('moving','stopped','idle','maintenance') DEFAULT 'idle',
  `route_id` char(36) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bus_id` (`bus_id`),
  KEY `driver_id` (`driver_id`),
  KEY `route_id` (`route_id`),
  KEY `timestamp` (`timestamp`),
  CONSTRAINT `bus_trackings_bus_fk` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`),
  CONSTRAINT `bus_trackings_driver_fk` FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bus_trackings_route_fk` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Notifications table
CREATE TABLE `notifications` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `title` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `type` enum('info','warning','alert','success') DEFAULT 'info',
  `category` enum('bus_arrival','delay','cancellation','route_change','general') DEFAULT 'general',
  `is_read` tinyint(1) DEFAULT '0',
  `data` json DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `is_read` (`is_read`),
  KEY `created_at` (`created_at`),
  CONSTRAINT `notifications_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Attendances table
CREATE TABLE `attendances` (
  `id` char(36) NOT NULL,
  `student_id` char(36) NOT NULL,
  `bus_id` char(36) DEFAULT NULL,
  `stop_id` char(36) DEFAULT NULL,
  `date` date NOT NULL,
  `type` enum('pickup','dropoff') NOT NULL,
  `status` enum('present','absent','late') NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `notes` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `attendance_unique` (`student_id`,`date`,`type`),
  KEY `bus_id` (`bus_id`),
  KEY `stop_id` (`stop_id`),
  KEY `date_bus` (`date`,`bus_id`),
  CONSTRAINT `attendances_student_fk` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`),
  CONSTRAINT `attendances_bus_fk` FOREIGN KEY (`bus_id`) REFERENCES `buses` (`id`),
  CONSTRAINT `attendances_stop_fk` FOREIGN KEY (`stop_id`) REFERENCES `stops` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
(UUID(), 'admin@busmanager.com', '$2a$12$DuEMPvhC6iYRB2vuOBMDquOhFzqYmWDhGKGVK25wIv/OFVlF5SJ6.', 'Admin', 'User', 'admin', 1, NOW(), NOW()),
(UUID(), 'driver@busmanager.com', '$2a$12$DuEMPvhC6iYRB2vuOBMDquOBMDquOhFzqYmWDhGKGVK25wIv/OFVlF5SJ6.', 'John', 'Driver', 'driver', 1, NOW(), NOW()),
(UUID(), 'parent@busmanager.com', '$2a$12$DuEMPvhC6iYRB2vuOBMDquOhFzqYmWDhGKGVK25wIv/OFVlF5SJ6.', 'Jane', 'Parent', 'parent', 1, NOW(), NOW());