const inquirer = require('inquirer');
require('dotenv').config();
const { addDepartment, addEmployee, addRole, updateEmployee, viewAllDepartments, viewAllEmployees, viewAllRoles } = require('./utils');

const question = {
    type: 'list',
    message: 'What would you like to do?',
    name: 'task',
    choices: [
        'View All Employees',
        'Add Employee',
        'Update Employee',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department'
    ]
};

inquirer.prompt(question)
.then((response) => {
    switch(response.task){
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'View All Employees':
            viewAllEmployees();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee':
            updateEmployee();
            break;
    }
})
.catch((err) => {
    console.log(err);
});