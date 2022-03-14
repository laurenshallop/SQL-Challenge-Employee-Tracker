USE employee_db;

INSERT INTO department (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Enginerr", 150000, 1),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Lauren", "Shallop", 1),
("Nicole", "Gonzalez", 2),
("Dominic", "Lucio", 3),
("Mirib", "Shallop", 4),
("Gregory", "Gonzalez", 5),
("Bella", "Shallop", 6),
("Madison", "Gonzalez", 7),
("Ariana", "Bickham", 5),
("Alexandria", "Camacho", 4);

SELECT * FROM department;