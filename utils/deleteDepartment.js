const db = require('../config/connection');
const inquirer = require('inquirer');

const deleteDepartment = () => {
    inquirer.prompt([
        {
            type: 'number',
            name: 'deptId',
            message: `Enter the department's id:`
        }
    ]).then((answers) => {
        db.query(`DELETE FROM department WHERE id = ${answers.deptId}`, (err) => {
            if(err){
                console.log(err);
            } else{
                console.log('Department deleted.');
            }
        })
    })
};

module.exports = deleteDepartment;