DROP DATABASE IF EXISTS employeetracker;
CREATE database employeetracker;

USE employeetracker;

CREATE TABLE employee (
  id INT NOT NULL auto_increment,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employeerole (
  id INT NOT NULL auto_increment,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10,4) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
id INT NOT NULL auto_increment,
deptname VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE manager (
id INT NOT NULL auto_increment, 
first_name VARCHAR(25),
title VARCHAR(30),
deptname VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);