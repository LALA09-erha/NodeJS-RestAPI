const conn = require('../database/connect');


//insert data to database
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

// for get nama item by id user
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
    return new Promise((resolves, reject) => {
        conn.connection.query('select * from items where namaitem=? and iduser=?',[data,data_2], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolves(result);
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

//delete data from tabel items
const deleteview = (data,data_2) => {
    return new Promise((resolve,reject) => {
        // looping data
        const old_data = data
        const new_data = data.splice(data_2,1);
        resolve(old_data);
    });
}

// edit data from tabel items
const editview = (data,data_2,data_3) => {
    return new Promise((resolve,reject) =>{
        var check = 0 ;
        // looping data
        for (let i = 0; i < data.length; i++) {
            //check apakah index i sama dengan data_2
            if (i == data_2) {
                //check apakah ada perubaha data atau tidak
                if(data[i].namaitem != data_3.namaitem || data[i].jumlahitem != data_3.jumlahitem){
                    data[i].namaitem = data_3.namaitem;
                    data[i].jumlahitem = Number(data_3.jumlahitem);
                    check = 1;
                }else{
                    check = 0;
                }
            }
        }
        
        // check apakah ada perubahan atau tidak
        if(check == 1){
            resolve(data);
        }else{
            reject(data)
        }
    })
}

const createItem = (data,data_2)=>{
    return new Promise((resolve,reject)=>{
        var item = data;
        var lengthItem = item.length;
        
         // check data already exist
         var check = 0;
         var jumlah = 0;
         for(var i= 0 ; i <lengthItem;i++){
             if((item[i].namaitem == data_2.namaitem && item[i].jumlahitem == data_2.jumlahitem) ||item[i].namaitem == data_2.namaitem && item[i].jumlahitem != data_2.jumlahitem){
                 var jumlah = parseInt(item[i].jumlahitem) + parseInt(data_2.jumlahitem);
                 item[i].jumlahitem = jumlah;
             }else if(item[i].namaitem != data_2.namaitem){
                 check ++;
             }
         }
         
         // if not exist then push data
         if(check == lengthItem){
             if(jumlah ==0){
                data_2['index'] = lengthItem;
                data_2['jumlahitem'] = parseInt(data_2.jumlahitem);
                 item.push(data_2);
                 resolve(item)
             }else{
                 resolve(item)
             }
         }else{
             reject(item);
         }

    })
}



//exports all function
module.exports = { getnamaitem, updatejumlahitem,updatejumlahitemfix,insert , deleteview,editview,createItem };