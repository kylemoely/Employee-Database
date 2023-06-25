const db = require('../config/connection');

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

module.exports = addEmployee;