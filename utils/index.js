const addDepartment = require('./addDepartment');
const addEmployee = require('./addEmployee');
const addRole = require('./addRole');
const updateEmployee = require('./updateEmployee');
const viewAllDepartments = require('./viewAllDepartments');
const viewAllEmployees = require('./viewAllEmployees');
const viewAllRoles = require('./viewAllRoles');
const viewEmployeesByManager = require('./viewEmployeesByManager');
const viewEmployeesByDepartment = require('./viewEmployeesByDepartment');
const deleteDepartment = require('./deleteDepartment');

module.exports = {
    addDepartment, addEmployee, addRole, updateEmployee, viewAllDepartments, viewAllEmployees, viewAllRoles, viewEmployeesByManager, viewEmployeesByDepartment, deleteDepartment
};