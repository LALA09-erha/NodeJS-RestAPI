const mysql = require('mysql');


//connection to database
const connection =  mysql.createConnection({
    host :'localhost',
    user :'root',
    password:"",
    database:"products"
});


module.exports={connection};