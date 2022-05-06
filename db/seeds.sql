/*USE employee_db;*/

INSERT INTO Department (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role(title, salary, department_id)
VALUES
('Sales Lead', 100000.00, 1),
('Salesperson', 80000.00, 1),
('Lead Engineer', 150000.00, 1),
('Software Engineer', 120000.00, 2),
('Accountant', 125000.00, 3),
('Legal Team Lead', 250000.00, 4),
('Lawyer', 190000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Lauren', 'Shallop', 1, null),
('Nicole', 'Gonzalez', 2, 2),
('Dominic', 'Lucio', 3, null),
('Mirib', 'Shallop', 4, 4),
('Gregory', 'Gonzalez', 5, null),
('Bella', 'Shallop', 6, 6),
('Madison', 'Gonzalez', 7, null),
('Ariana', 'Bickham', 5, 5),
('Alexandria', 'Camacho', 4, null);

/*SELECT * FROM department;*/