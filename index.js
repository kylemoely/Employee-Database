const inquirer = require('inquirer');
require('dotenv').config();
const { addDepartment, addEmployee, addRole, updateEmployee, viewAllDepartments, viewAllEmployees, viewAllRoles, viewEmployeesByManager, viewEmployeesByDepartment, deleteDepartment, deleteRole, deleteEmployee, viewBudget, viewEmployeesByRole } = require('./utils');

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
        'Add Department',
        'View Employees By Manager',
        'View Employees By Department',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'View Budget By Department',
        'View Employees By Role'
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
        case 'View Employees By Manager':
            viewEmployeesByManager();
            break;
        case 'View Employees By Department':
            viewEmployeesByDepartment();
            break;
        case 'Delete Department':
            deleteDepartment();
            break;
        case 'Delete Role':
            deleteRole();
            break;
        case 'Delete Employee':
            deleteEmployee();
            break;
        case 'View Budget By Department':
            viewBudget();
            break;
        case 'View Employees By Role':
            viewEmployeesByRole();
            break;
    }
})
.catch((err) => {
    console.log(err);
});