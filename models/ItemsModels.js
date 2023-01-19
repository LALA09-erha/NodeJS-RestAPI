const conn = require('../database/connect');


//insert
const insert = (data) => {
    return new Promise((resolve, reject) => {
        conn.connection.query('INSERT INTO items SET ?', data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });

}


const getnamaitem = (data) => {
    return new Promise((resolve, reject) => {
        conn.connection.query('select namaitem from items where iduser=?',[data], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });}


//update jumlah item
const updatejumlahitem = (data,data_2) => {    
    return new Promise((resolve, reject) => {
        conn.connection.query('select * from items where namaitem=? and iduser=?',[data,data_2], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//mengambil jumlah item yanng dipilih
const updatejumlahitemfix = (data,data_2,data_3,data_4) => {
    return new Promise((resolve, reject) => {
        conn.connection.query('UPDATE items SET jumlahitem=?, idsession=? WHERE namaitem=? and iduser=?',[data.toString(),data_4,data_2,data_3], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);

            }
        });
    });
}
module.exports = { getnamaitem, updatejumlahitem,updatejumlahitemfix,insert };