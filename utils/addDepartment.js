const db = require('../config/connection');
const inquirer = require('inquirer');

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

module.exports = addDepartment;