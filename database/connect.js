const mysql = require('mysql');

const connection =  mysql.createConnection({
    host :'localhost',
    user :'root',
    password:"",
    database:"products"
});

// connection.connect((error) =>{
//     if(error) throw error;
//     console.log("SQL berhasil terkoneksi!") ;
// });

module.exports={connection};