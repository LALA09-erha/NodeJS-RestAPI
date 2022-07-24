const mysql = require('mysql');

const conn =  mysql.createConnection({
    host :'localhost',
    user :'root',
    password:"",
    database:"blog"
});

conn.connect((error) =>{
    if(error) throw error;
    console.log("SQL berhasil terkoneksi!") ;
});

module.exports=conn;