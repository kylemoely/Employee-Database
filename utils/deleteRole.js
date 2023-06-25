const db = require('../config/connection');
const inquirer = require('inquirer');

const deleteRole = () => {
    inquirer.prompt([
        {
            type: 'number',
            name: 'roleId',
            message: `Enter the role's id:`
        }
    ]).then((answers) => {
        db.query(`DELETE FROM role WHERE id = ${answers.roleId}`, (err) => {
            if(err){
                console.log(err);
            } else{
                console.log('Role deleted.');
            }
        })
    })
};

module.exports = deleteRole;