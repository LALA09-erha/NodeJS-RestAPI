const conn = require('../database/connect');


// insert user 
exports.insert = (data) => {
    return new Promise((resolve, reject) => {
        conn.connection.query('INSERT INTO users SET ?', data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}


// check user by username
exports.checkuserbyusername = (data) => {
    return new Promise((resolve, reject) => {
        conn.connection.query('select * from users where username=? ', data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//check user by email 
exports.checkuserbyemail = (data) => {
    return new Promise((resolve, reject) => {
        conn.connection.query('select * from users where email=? ', data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}