DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE storage (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NULL DEFAULT NULL,
  `text` VARCHAR(500) NULL DEFAULT NULL,
  `time` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);

/* You can also create more tables, if you need them... */

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/
