const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: 3306
});

module.exports = db;