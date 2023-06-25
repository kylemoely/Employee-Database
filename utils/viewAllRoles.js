const db = require('../config/connection');

const viewAllRoles = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.name AS department FROM role
              LEFT JOIN department ON role.department_id = department.id`, (err, res) => {
        if(err){
            console.log(err);
        } else{
            console.table(res);
        };
    });
};

module.exports = viewAllRoles;