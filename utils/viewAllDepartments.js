const db = require('../config/connection');

const viewAllDepartments = () => {
    db.query('SELECT name AS department, id FROM department', (err, res) => {
        if(err){
            console.log(err);
        } else{
            console.table(res);
        };
    });
};

module.exports = viewAllDepartments;