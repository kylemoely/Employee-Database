const db = require('../config/connection');

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
                `Employee's last name`,
                `Employee's manager`
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
            case `Employee's manager`:
                inquirer.prompt([
                    {
                        type: 'number',
                        name: 'empManId',
                        message: `Enter the employee's new manager's id:`
                    }
                ]).then((answers2) => updateQuery(answers.empId, 'manager_id', answers2.empLast));
                break;
        }
    })
}

module.exports = updateEmployee;