const express = require('express');
// Import and require mysql2
const mysql = require("mysql2");
const cTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database`)
);

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to employee_db')
    menu();
});
function menu() {
    inquirer
        .prompt ([
            {
                type: 'list',
                choices: ['View all Departments',
                    'View all Roles',
                    'View all Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                    'Finish'

            ],
            name: 'menu',
            message: "Choose one of the following options",
            }
        ])
        .then(function(data) {
            switch (data.menu) {
                case 'View all Departments':
                    viewDepartments();
                    break;
                case 'View all Roles':
                    viewRoles();
                    break;
                case 'View all Employees':
                    viewEmployees();
                    break;
                case 'ADD a Department':
                    addDepartment();
                    break;
                case 'ADD a Role':
                    addRole();
                    break;
                case 'ADD a Employee':
                    addEmployee();
                    break;
                case 'UPDATE an Employee Role':
                    updateEmployee();
                    break;
                case 'Finish':
                    finish();
                    break;
            }
        });
}
const viewDepartments = () => {
    console.log('Viewing all departments');
    let sql = `SELECT * FROM department`;
    db.query(sql, (err,res ) => {
        if (err) throw err;
        console.table(res);
        menu();
    })
};

const viewRoles = () => {
    console.log('Viewing all roles');
    const sql = `SELECT r.id, r.title, r.salary, d.name AS department FROM role r LEFT JOIN department d ON r.department_id = d.id;`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    })
};

const viewEmployees = () => {
    console.log('Viewing  all employees');
    const sql = `SELECT e.id, e.first_name, e.last_name, e.role_id,CONCAT (m.first_name,'' ,m.last_name) AS manager, r.title AS job_title, r.salary AS salary FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN employee m ON e.manager_id = m.id;`
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        menu();
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept',
            message: 'Enter the name of the department'
        }
    ])
        .then(function (data) {
            db.query(`INSERT INTO department (name) VALUES (?)` , [data.dept], function (err, res) {
                if (err) throw err;
                console.log([data.dept] + `id added to database`);
                menu();
            })
        })
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'empfirstname',
            message: 'What is the employees first name?'
        },

        {
            type: 'input',
            name: 'emplastname',
            message: 'What is the employees last name?'
        },

        {
            type: 'input',
            name: 'emprole',
            message: 'What is the employees role id?'
        }, 

        {
            type: 'input',
            name: 'empmanager',
            message: 'What is the manager id for this employee?'
        }
    ])
    .then(function(data) {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [data.empfirstname, data.emplastname, data.emprole, data.empmanager], (err, res) => {
            if (err) throw err;
            console.log([data.empfirstname, data.emplastname] + 'has been added to the database');
            menu();
        })
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'rolename',
            message: 'What is the name of this role?'
        },
        {
            type: 'input',
            name: 'rolesalary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'input',
            name: 'roledept',
            message: 'What is the department number for this role?'
        }
    ]).then (function(data) {
        db.query(`INSERT INTO role(title,salary,department_id) VALUES(?,?,?)`, [data.rolename, data.rolesalary, data.roledept], (err,res) => {
            if(err) throw err;
            console.log([data.rolename] + `has been added to database`);
            menu();
        })
    })
};

const updateEmployee = () => {
    const sql = `SELECT * FROM employee;`
    db.query(sql, (err,res) => {
        if(err) throw err;
        console.table('_____', res);
    })

inquirer.prompt([
    {
        type: 'input',
        name: 'eid',
        message: "Enter the employee ID you want to update"
    },
    {
        type: 'input',
        name: 'newrole',
        message: 'Enter the role ID number for the employee: 1=Sales Lead / 2=Salesperson / 3=Lead Engineer / 4=Software Engineer / 5=Accountant / 6=Legal Team Lead / 7=Lawyer',
    }
]).then (function(data) {
    db.query(`UPDATE employee SET role_id = (?) WHERE employee.id = (?)`, [data.newrole, data.eid], (err,res) => {
        if(err) throw err;
        console.log('Employee role has been updated');
        menu();
    })
})
}
const finish = () => {
    console.log('Complete');
    db.end();
    process.exit();
};
app.listen(PORT, () => {
    console.log(`now listening on port ${PORT}`);
});