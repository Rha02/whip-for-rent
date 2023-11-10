-- This file contains the SQL commands to initialize tables for the database.

-- Drop Users table and recreate it if it exists
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    access_level INTEGER NOT NULL DEFAULT 3
);

-- Create Cars table
DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    color VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Reservations table
DROP TABLE IF EXISTS reservations;
CREATE TABLE reservations (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    car_id VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (car_id) REFERENCES cars(id)
);

-- Create Locations table
DROP TABLE IF EXISTS CarLocation;
CREATE TABLE CarLocation (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    city VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES cars(id)
);

