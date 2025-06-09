CREATE DATABASE recipe_platform;
USE recipe_platform;

CREATE TABLE recipes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  instructions TEXT NOT NULL,
  user_id INT NOT NULL,
  production_time INT NOT NULL,
  like_count INT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  pass VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  profile_pic MEDIUMBLOB,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  ing_name VARCHAR(255) NOT NULL,
  quantity VARCHAR(50) NOT NULL,
  recipe_id INT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  comment TEXT NOT NULL,
  recipe_id INT NOT NULL,
  user_id INT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE recipes
ADD COLUMN image MEDIUMBLOB;


INSERT INTO user (username, pass, firstname, lastname, email) VALUES 
('ckostanikos', 'password1', 'Christos', 'Kostanikos', 'c.kostanikos@outlook.com');

INSERT INTO user (username, pass, firstname, lastname, email) VALUES 
('mpatsianotaki', 'password2', 'Maria', 'Patsianotaki', 'm.patsianotaki@outlook.com');

INSERT INTO user (username, pass, firstname, lastname, email) VALUES 
('littlechef', 'password2', 'Maria', 'Patsianotaki', 'littlechef@outlook.com');