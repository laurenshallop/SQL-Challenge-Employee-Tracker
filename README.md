## Table of Contents

## License

## Description

This application manages a business owners employee database using Node.JS, inquirer, and MySQL. 

## Installation

After cloning the application to your terminal go to the root of the project directory. Enter in the terminal 'npm init-y' and 'npm i express inquirer mysql2 '


## Usage

Run the following command 'node server.js' and you will see the optoins. You can click to view departments, roles or employees. You can add a department, role or employee. You can update an employee role. 


# SQL-Challenge-Employee-Tracker
The employee tracker allows the user to Create, Read, Update and Delete specific data related to employees. The program uses a MySQL database to store the information. 


AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database


Database Schema:
department

    id: INT PRIMARY KEY

    name: VARCHAR(30) to hold department name

role

    id: INT PRIMARY KEY

    title: VARCHAR(30) to hold role title

    salary: DECIMAL to hold role salary

    department_id: INT to hold reference to department role belongs to

employee

    id: INT PRIMARY KEY

    first_name: VARCHAR(30) to hold employee first name

    last_name: VARCHAR(30) to hold employee last name

    role_id: INT to hold reference to employee role

    manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)



