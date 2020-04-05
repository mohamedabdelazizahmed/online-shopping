const mysql = require('mysql2');

// create connection with pool 
//  pool finished when application shutdown 
const  pool =  mysql.createPool({
    host : 'localhost',
    users:'root',
    database: 'node-complete',
    password: ''
});
module.exports = pool.promise();
