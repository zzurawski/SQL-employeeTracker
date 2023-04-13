DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;
USE business_db;

CREATE TABLE department (
    `id` INT NOT NULL PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    `id` INT NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `salary` DECIMAL NOT NULL,
    `department_id` INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    `id` INT NOT NULL PRIMARY KEY,
    `first_name` VARCHAR(30) NOT NULL,
    `last_name` VARCHAR(30) NOT NULL,
    `role_id` INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    `manager_id` INT,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);