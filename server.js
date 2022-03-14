//const express = require('express'); // do i need this?
const inquirer = require("inquirer");
//const res = require(''); // do i need this?
const mysql = require('mysql2');
require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "employee_db"
})

connection.connect(function (err) {
    if (err) throw err;
    firstPrompt();
});

function firstPrompt(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View Employees By Department',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Add Role',
                'Add Department',
                'Exit'
            ]
    
        }
    ]).then((res) => {
        console.log(res.userChoice);
        switch(res.userChoice){
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View Employees By Department':
                viewAllEmployeesByDepartment();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Exit':
                connection.end();
                break;
        }

    }).catch((err) => {
        if(err)throw err;
    });
}

    // employee

    function viewAllEmployees() {
        let query =
        `SELECT 
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title,
            department.name AS deperatment,
            role.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role
            ON employee.role_id = role.id
        LEFT JOIN department
            ON department.id = role.department_id
        LEFT JOIN employee manager
            ON manager.id = employee.manager_id`

        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            firstPrompt();
        });
    }

    // employees by department

    function viewAllEmployeesByDepartment() {
        let query =
        `SELECT
            department.id,
            deparment.name,
            role.salary
        FROM employee
        LEFT JOIN role
            ON employee.role_id = role.id
        LEFT JOIN department
            ON department.id = role.department_id
        GROUP BY department.id, department.name, role.salary`;

        connection.query(query, (err, res)=> {
            if(err) throw err;
            const deptChoices = res.map((choices) => ({
                value: choices.id, name: choices.name
            }));
            console.table(res);
            getDept(deptChoices);
        });
    }

    function getDept(deptChoices){
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Departments:',
                   choices: deptChoices 
                }
            ]).then ((res) =>{
                let query = 
                `SELECT
                   employee.id,
                   employee.first_name,
                   employee.last_name,
                   role.title,
                   department.name
                FROM employee
                JOIN role
                    ON employee.role_id = role.id
                JOIN department
                    ON department.id = role.department_id
                WHERE deparment.id = ?`

                connection.query(query, res.department,(err, res)=>{
                    if(err) throw err;
                    firstPrompt();
                    console.table(res);
                });
            })
    }

            function addEmployee() {
                let query =
                `SELECT
                    role.id,
                    role.title,
                    role.salary
                FROM role`
            

                connection.query(query, (err, res) => {
                    if(err)throw err;
                    const role = res.map(({ id,title,salary }) => ({
                        value: id,
                        title: `${title}`,
                        salary: `${salary}`
                    }));

                    console.table(res);
                    employeeRoles(role);
                });
            }
            
            function employeeRoles(role) {
                inquirer
                    .prompt([
                        {
                            typle: "input",
                            name: "firstName",
                            message: "Employee First Name: "                       
                         },
                         {
                            typle: "input",
                            name: "lastName",
                            message: "Employee Last Name: " 
                         },
                         {
                            typle: "list",
                            name: "roleId",
                            message: "Employee Role: ",
                            choices: role
                         }
                    ]).then((res) => {
                        let query = `INSERT INTO employee SET ?`
                        connection.query(query,{
                            first_name: res.firstName,
                            last_name: res.lastName,
                            role_id: res.roleId
                        },(err,res)=>{
                            if(err) throw err;
                            firstPrompt();
                        });
                    });
            }
    
    function removeEmployee() {
        let query =
        `SELECT
            employee.id,
            employee.first_name,
            employee.last_name
        FROM employee`

        connection.query(query, (err, res) => {
            if(err)throw err;
            const employee = res.map(({ id, first_name, last_name }) => ({
                value: id,
                name: `${id} ${first_name} ${last_name}`
            }));
            console.table(res);
            getDelete(employee);
        });
    }

        function getDelete(employee){
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Employee To Be Deleted: ",
                        choices: employee
                    }
                ]).then((res) => {
                    let query = `DELETE FROM employee WHERE ?`;
                    connection.query(query, { id: res.employee }, (err,res) => {
                        if(err)throw err;
                        firstPrompt();
                    });
                });
        }

        function updateEmployeeRole(){
            let query = `SELECT
                            employee.id,
                            employee.first_name,
                            employee.last_name,
                            role.title,
                            department.name,
                            role.salary,
                            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                        FROM employee
                        JOIN role
                            ON employee.role_id = role.id
                        JOIN department
                            ON department.id = role.department_id
                        JOIN employee manager
                            ON manager.id = employee.manager_id`
            
            connection.query(query,(err, res) => {
                if(err)throw err;
                const employee = res.map(({ id, first_name,last_name }) => ({
                    value: id,
                    name: `${first_name} ${last_name}`
                }));
                console.table(res);
                updateRole(employee);
            });
        }

        function updateRole(employee){
            let query =
            `SELECT
                role.id,
                role.title,
                role.salary
            FROM role`

            connection.query(query,(err,res) => {
                if(err)throw err;
                let roleChoices = res.map(({ id, title, salary }) => ({
                    value: id,
                    title: `${title}`,
                    salary: `${salary}`
                }));
                console.table(res);
                getUpdatedRole(employee, roleChoices);
            });
        }
    

        function getUpdatedRole (employee, roleChoices){
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: `Employee who's role will be Updated: `,
                        choices: employee
                    },
                    {
                        type: "list",
                        name: "roel",
                        message: `Select New Role: `,
                        choices: roleChoices
                    },

                ]).then((res) => {
                    let query =`UPDATE employee SET role-id = ? WHERE id =?`
                    connections.query(query,[ res.role, res.employee], (err,res)=>{
                        if(err) throw err;
                        firstPrompt(); 
                    });
                });
            }

        function addRole(){
            var query = 
            `SELECT
                department.id,
                department.name,
                role.salary
            FROM employee
            JOIN role
                ON employee.role_id = role.id
            JOIN department
                ON department.id = role.department_id
            GROUP BY department.id, department.name`

            connection.query(query, (err, res) => {
                if(err)throw err;
                const department = res.map (({ id,name }) => ({
                    value: id,
                    name: `${id} ${name}`
                }));
                console.table(res);
                addToRole(department);
            });
        }

    function addToRole(department){
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Role title: "
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Role Salary: "
                },
                {
                    type: "list",
                    name: "department",
                    message: "Department: ",
                    choices: department
                },
            ]).then((res) =>{
                let query =`INSERT INTO role SET ?`;

                connection.query(query, {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.department
                },(err,res) => {
                    if(err) throw err;
                    firstPrompt();
                });
            });
    }
    function addDepartment(){
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Department Name:"
                }
            ]).then((res) => {
                let query =`INSERT INTO department SET ?`;
                connection.query(query, {name: res.name}, (err,res) => {
                    if(err) throw err;
                    firstPrompt();
                });
            });
        }
    

/*const PORT = process.env.PORT || 3001;
const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// call once somewhere in the beginning of the app
const cTable = require('console.table');
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

// create a connection between our sever and our local mysql database 

// POST request
app.post

// INSERT into the database 

// GET request 
app.get

// listen
app.listen(PORT, () => console.log('server listening on port' + PORT));*/