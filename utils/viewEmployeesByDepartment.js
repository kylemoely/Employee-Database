const db = require('../config/connection');
const inquirer = require('inquirer');

const viewEmployeesByDepartment = () => {
    inquirer.prompt([
        {
            type: 'number',
            name: 'deptId',
            message: `Enter the department's id:`
        }
    ]).then((answers) => {
        db.query(`SELECT E1.id, CONCAT(E1.first_name, " ", E1.last_name) AS name, role.title AS role,
        department.name AS department, role.salary AS salary, CONCAT(E2.first_name, " ", E2.last_name) AS manager
        FROM employee E1
        LEFT JOIN role ON E1.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee E2 ON E1.manager_id = E2.id
        WHERE role.department_id = ${answers.deptId}`, (err, res) => {
            if(err){
                console.log(err);
            } else{
                console.table(res);
            }
        })
    })
}

module.exports = viewEmployeesByDepartment;