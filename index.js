const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const Department = require('./classes/departmentClass');
const Role = require('./classes/roleClass');
const Employee = require('./classes/employeeClass');

require('dotenv').config;

const db = mysql.createConnection(
    {
        user: process.env.user,
        password: process.env.password,
        database: process.env.database,
    }
)

const questions = 
    {
        init: [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'beginOptions',
            choices: ['View a Table', 'Edit a Table', 'Exit']
        }
        ],
        selectTable: [
            {
                type: 'list',
                message: 'Choose a Table',
                name: 'selectTable',
                choices: ['Department', 'Employee', 'Role', 'Return']
            }
        ],
        editTable: [
            {
                type: 'list',
                message: 'What would you like to change?',
                name: 'editChoice',
                choices: ['Add Employee', 'Add Role', 'Add Dept', 'Return'],
            }
        ],
        addEmployee: [
            {
                type: 'input',
                message: 'Enter the ID of the new employee',
                name: 'employeeID'
            },
            {
                type: 'input',
                message: 'What is the first name of the new employee?',
                name: 'employeeFirstName',
            },
            {
                type: 'input',
                message: 'What is the last name of the new employee?',
                name: 'employeeLastName'
            },
            {
                type: 'input',
                message: 'Input the role ID of the new employee',
                name: 'employeeRole',
            },
            {
                type: 'confirm',
                message: 'Does this employee report to a manager?',
                name: 'confirmManager'
            },
        ],
        addDept: [
            {
                type: 'input',
                message: 'Enter the id of the dept you wish to add',
                name: 'changeDeptID',
            },
            {
                type: 'input',
                message: 'What would you like to call this department?',
                name: 'deptName',
            }
        ],
        addRole: [
            {
                type: 'input',
                message: 'Enter the new id of the role you would like to add',
                name: 'roleID'
            },
            {
                type: 'input',
                message: 'Enter the new role title',
                name: 'roleTitle',
            },
            {
                type: 'number',
                message: 'What is the salary for this role (decimal form pls)?',
                name: 'roleSalary',
            },
            {
                type: 'input',
                message: 'Please enter the dept id this role falls under',
                name: 'roleDept',
            }
        ],
            
        
    };

function init() {
    inquirer.prompt(questions.init)
        .then((answer) => {
            switch (answer.beginOptions) {
                case "View a Table":
                    selectTable();
                    break;
                case "Edit a Table":
                    editTable();
                    break;
                default:
                    process.exit;
                    break;
            }
        })
};

function selectTable() {
    inquirer.prompt(questions.selectTable)
        .then((answer) => {
            switch (answer.selectTable) {
                case 'Department':
                    viewDept();
                    break;
                case 'Role':
                    viewRole();
                    break;
                case 'Employee':
                    viewEmployee();
                    break;
                case 'Return':
                    init();
                    break;
            }
        })
};

function editTable() {
    inquirer.prompt(questions.editTable)
        .then((answer) => {
            switch (answer.editChoice) {
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Department':
                    addDept();
                    break;
                default:
                    init();
                    break;
            }
        })
};

function addEmployee() {
    inquirer.prompt(questions.addEmployee)
        .then((answers) => {
            
            if (answers.confirmManager === true) {
                inquirer.prompt(
                    {
                        type: 'input',
                        message: 'Enter the managers id for this employee',
                        name: 'manager_id'
                    }
                )
            } else {
                answers.manager_id = 'None'
            };

            let newEmployee = new Employee(
                answers.employeeID,
                answers.employeeFirstName,
                answers.employeeLastName,
                answers.employeeRole,
                answers.manager_id,
            );

            db.query('INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES(?,?,?,?,?)'),
            [employee.employeeID, employee.employeeFirstName, employee.employeeLastName, employee.employeeRole, employee.manager_id],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.table(newEmployee);
                    db.query(`SELECT * FROM employee`, function (err, result) {
                        console.table(result);
                        init();
                    })
                }
            }


        })
};

function addDept() {
    inquirer.prompt(questions.addDept)
        .then((answers) => {
            let newDept = new Department(
                answers.changeDeptID,
                answers.deptName,
            )

            db.query('INSERT INTO department (id, name) VALUES(?,?)'),
            [newDept.changeDeptID, newDept.deptName],
            (err, result) => {
                console.log(err)
            };
            console.table(newDept);
            db.query(`SELECT * FROM department`, function (err, results) {
                console.table(results);
                init();
            })
        })
};

function addRole() {
    inquirer.prompt(questions.addRole)
        .then((answers) => {
            let newRole = new Role(
                answers.roleID,
                answers.roleTitle,
                answers.roleSalary,
                answers.roleDept,
            );

            db.query('INSERT INTO role (id, title, salary, department_id) VALUES(?,?)'),
            [role.id, role.title, role.salary, role.department_id],
            (err, results) => {
                if (err) {
                    console.log(err);
                }
                console.table(newRole);
                db.query('SELECT * FROM role', function (err, results) {
                    console.table(results);
                    init();
                })
            }
        })
};

function viewDept() {
    db.query('SELECT * FROM department', (err, result) => {
    console.table(result);
    init()
    })
};

function viewRole() {
    db.query('SELECT * FROM role', (err, result) => {
        console.table(result);
        init();
    })
};

function viewEmployee() {
    db.query('SELECT * FROM employee', (err, result) => {
        console.table(result);
        init();
    })
}
