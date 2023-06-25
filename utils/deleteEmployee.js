const db = require('../config/connection');
const inquirer = require('inquirer');

const deleteEmployee = () => {
    inquirer.prompt([
        {
            type: 'number',
            name: 'empId',
            message: `Enter the employee's id:`
        }
    ]).then((answers) => {
        db.query(`DELETE FROM employee WHERE id = ${answers.empId}`, (err) => {
            if(err){
                console.log(err);
            } else{
                console.log('Employee deleted.');
            }
        })
    })
};

module.exports = deleteEmployee;