--CREATE DATABASE lightbnb;
--\c lightbnb


DROP TABLE IF EXISTS properties CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS property_reviews CASCADE;
DROP TABLE IF EXISTS rates CASCADE;
DROP TABLE IF EXISTS guest_reviews CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) ,
  password  VARCHAR(255) DEFAULT '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
);

CREATE TABLE properties (
id SERIAL PRIMARY KEY,
owner_id INTEGER NOT NULL REFERENCES users(id),
title VARCHAR(255) NOT NULL,
description VARCHAR(255),
thumbnail_photo_url VARCHAR(255) NOT NULL,
cover_photo_url VARCHAR(255) NOT NULL,
cost_per_night VARCHAR(255) NOT NULL,
street VARCHAR(255) NOT NULL ,
parking_spaces VARCHAR(255) NOT NULL ,
number_of_bathrooms INTEGER,
number_of_bedrooms INTEGER,
country VARCHAR(255) NOT NULL,
city VARCHAR(255) NOT NULL,
province VARCHAR(255) NOT NULL ,
post_code  VARCHAR(255) NOT NULL,
active BOOLEAN
);


CREATE TABLE reservations (
id SERIAL PRIMARY KEY,
start_date DATE ,
end_date DATE ,
property_id INTEGER NOT NULL REFERENCES properties(id),
guest_id INTEGER NOT NULL REFERENCES users(id)
);


CREATE TABLE rates (
id SERIAL PRIMARY KEY,
start_date DATE ,
end_date DATE,
cost_per_night VARCHAR(255) NOT NULL,
property_id INTEGER NOT NULL REFERENCES properties(id)
);

CREATE TABLE property_reviews (
  id SERIAL PRIMARY KEY,
  guest_id INTEGER NOT NULL REFERENCES users(id),
  reservation_id INTEGER NOT NULL REFERENCES reservations(id),
  property_id INTEGER NOT NULL REFERENCES properties(id),
  rating INTEGER NOT NULL,
  message VARCHAR(255) 
);



CREATE TABLE guest_reviews (
id SERIAL PRIMARY KEY,
guest_id INTEGER NOT NULL REFERENCES users(id),
owner_id INTEGER NOT NULL REFERENCES users(id),
reservation_id INTEGER NOT NULL REFERENCES reservations(id),
rating INTEGER NOT NULL,
message VARCHAR(255)
);

