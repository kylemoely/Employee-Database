const db = require('../config/connection');
const inquirer = require('inquirer');

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

module.exports = addRole;