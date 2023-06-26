const db = require('../config/connection');
const inquirer = require('inquirer');

const viewBudget =() => {
    let total = 0;
    inquirer.prompt([
        {
            type: 'number',
            name: 'deptId',
            message: `Enter the department's id:`
        }
    ]).then((answers) => {
        db.query(`SELECT id FROM role WHERE department_id = ${answers.deptId} `, (err, res) => {
            if(err){
                console.log(err);
            } else{
                // get roles from department table. for each role, get salary for role and multiply times number of employees in that role. 
                for(x=0;x<res.length;x++){
                    let id = res[x].id
                    db.query(`SELECT salary FROM role WHERE id = ${id}`, (err2, res2) => {
                        if(err2){
                            console.log(err2);
                        } else{
                            let salary = res2[0].salary
                            db.query(`SELECT COUNT(id) FROM employee WHERE role_id = ${id}`, (err3, res3) => {
                                if(err3){
                                    console.log(err3);
                                } else{
                                    total += salary * res3[0]['COUNT(id)'];
                                }
                            })
                        }
                    })
                }
            }
        })
    })
    setTimeout(function(){
        console.log(`Department's total salary is ${total}`);
    }, 500);
}

module.exports = viewBudget;