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
    image_url VARCHAR(255) NOT NULL,
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

-- Insert Dummy Car Data
INSERT INTO cars (id, make, model, year, color, price, image_url)
VALUES ("1234", "my_make", "my_model", 2020, "my_color", 10000, "my_image_url");
INSERT INTO cars (id, make, model, year, color, price, image_url)
VALUES ("1235", "my_make2", "my_model2", 2021, "my_color2", 20000, "my_image_url2");
INSERT INTO cars (id, make, model, year, color, price, image_url)
VALUES ("1236", "my_make3", "my_model3", 2022, "my_color3", 30000, "my_image_url3");
INSERT INTO cars (id, make, model, year, color, price, image_url)
VALUES ("1237", "my_make4", "my_model4", 2023, "my_color4", 40000, "my_image_url4");
INSERT INTO cars (id, make, model, year, color, price, image_url)
VALUES ("1238", "my_make5", "my_model5", 2024, "my_color5", 50000, "my_image_url5");