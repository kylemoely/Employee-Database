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
        'Update Employee',
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
    db.query(`SELECT E1.id, CONCAT(E1.first_name, " ", E1.last_name) AS name, role.title AS role,
              department.name AS department, role.salary AS salary, CONCAT(E2.first_name, " ", E2.last_name) AS manager
              FROM employee E1
              LEFT JOIN role ON E1.role_id = role.id
              LEFT JOIN department ON role.department_id = department.id
              LEFT JOIN employee E2 ON E1.manager_id = E2.id`, (err, res) => {
                if(err){
                    console.log(err);
                } else{
                    console.table(res);
                };
              });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Enter the department name:'
        }
    ]).then((answers) => {
        db.query(`INSERT INTO department(name)
                  VALUES ('${answers.deptName}')`, (err,) => {
                    if(err){
                        console.log(err);
                    } else{
                        console.log('Department added.');
                    };
                  });
    })
};

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleTitle',
            message: `Enter the role's title:`
        },
        {
            type: 'number',
            name: 'roleSalary',
            message: `Enter the role's salary:`
        },
        {
            type: 'number',
            name: 'roleDept',
            message: `Enter the role's department id:`
        }
    ]).then((answers) => {
            db.query(`INSERT INTO role(title, salary, department_id)
                      VALUES ('${answers.roleTitle}', ${answers.roleSalary}, ${answers.roleDept})`, (err) => {
                        if(err){
                            console.log(err);
                        } else{
                            console.log('Role added.');
                        }
                      });
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'empFirstName',
            message: `Enter the employee's first name:`
        },
        {
            type: 'input',
            name: 'empLastName',
            message: `Enter the employee's last name:`
        },
        {
            type: 'number',
            name: 'empRole',
            message: `Enter the employee's role id:`
        },
        {
            type: 'number',
            name: 'empManager',
            message: `Enter the employee's manager id:`
        }
    ]).then((answers) => {
            db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
                      VALUES ('${answers.empFirstName}', '${answers.empLastName}', ${answers.empRole}, ${answers.empManager})`, (err) => {
                        if(err){
                            console.log(err)
                        } else{
                            console.log('Employee added.')
                        }
                      })
    })
}

const updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'number',
            name: 'empId',
            message: `Enter the employee's id:`
        },
        {
            type: 'list',
            name: 'editOpt',
            message: 'What would you like to update?',
            choices: [
                `Employee's role`,
                `Employee's manager`,
                `Employee's first name`,
                `Employee's last name`
            ]
        }
    ]).then((answers) => {
        const updateQuery = (empId, column, value) => {
            db.query(`UPDATE employee
                      SET ${column} = ${value} 
                      WHERE id = ${empId}`, (err) => {
                        if(err){
                            console.log(err);
                        } else{
                            console.log('Employee updated.');
                        }
                      })
        }
        switch(answers.editOpt){
            case `Employee's role`:
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'roleId',
                        message: `Enter the employee's new role id:`
                    }
                ]).then((answers2) => updateQuery(answers.empId, 'role_id', answers2.roleId));
                break;
            case `Employee's manager`:
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'manId',
                        message: `Enter the employee's new manager id:`,
                        default: null
                    }
                ]).then((answers2) => updateQuery(answers.empId, 'manager_id', answers2.manId));
                break;
            case `Employee's first name`:
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'empFirst',
                        message: `Enter the employee's new first name:`
                    }
                ]).then((answers2) => updateQuery(answers.empId, 'first_name', `'${answers2.empFirst}'`));
                break;
            case `Employee's last name`:
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'empLast',
                        message: `Enter the employee's new last name:`
                    }
                ]).then((answers2) => updateQuery(answers.empId, 'last_name', `'${answers2.empLast}'`));
                break;
        }
    })
}

inquirer.prompt(question)
.then((response) => {
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