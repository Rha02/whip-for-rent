-- This file contains the SQL commands to initialize tables for the database.
-- Drop all tables if they exist
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS car_locations;
DROP TABLE IF EXISTS users;

-- Drop Users table and recreate it if it exists
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

-- Create Locations table
CREATE TABLE car_locations (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    city VARCHAR(255) NOT NULL
);

-- Create Cars table
CREATE TABLE cars (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    make VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    color VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image_name VARCHAR(255) NOT NULL,
    location_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES car_locations(id)
);

-- Create Reservations table
CREATE TABLE reservations (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    car_id VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (car_id) REFERENCES cars(id)
);

-- Create Payments table
CREATE TABLE payments (
    reservation_id INTEGER PRIMARY KEY NOT NULL,
    amount INTEGER NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id)
);

