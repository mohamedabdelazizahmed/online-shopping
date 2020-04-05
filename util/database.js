const mysql = require('mysql2');

// create connection with pool 
//  pool finished when application shutdown 
const  pool =  mysql.createPool({
    host : 'localhost',
    user:'root',
    database: 'node-complete',
});
module.exports = pool.promise();
