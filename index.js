const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: 3306
});

const question = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'task',
    choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department'
    ]
};

const viewAllDepartments = () => {
    db.query('SELECT name AS department, id FROM department', (err, res) => {
        if(err){
            console.log(err);
        } else{
            console.table(res);
        };
    });
};

const viewAllroles = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.name AS department FROM role
              LEFT JOIN department ON role.department_id = department.id`, (err, res) => {
        if(err){
            console.log(err);
        } else{
            console.table(res);
        };
    });
};

const viewAllEmployees = () => {
    db.query(`SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS name, role.title AS role,
              department.name AS department, role.salary AS salary
              FROM employee
              LEFT JOIN role ON employee.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id`, (err, res) => {
                if(err){
                    console.log(err);
                } else{
                    console.table(res);
                };
              });
};

inquirer.prompt(question).then((response) => {
    switch(response.task){
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            viewAllroles();
            break;
        case 'View All Employees':
            viewAllEmployees();
            break;
    }
}).catch((err) => {
    console.log(err);
});