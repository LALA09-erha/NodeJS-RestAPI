'use strict';

const response = require('./response');
const connect = require('./connect');

//untuk mengecek apakah rest api berjalan
exports.index = function(req,res){
    response.ok("APLIKASI REST API BERHASIL DI JALANKAN",res);
}

// untuk menampilkan semua data di data base

exports.showalldata = function(req,res){
    connect.query("SELECT * from post",function(error,row,fields){
        if(error){
            connect.log(error)
        }else{
            response.ok(row,res);
        };
    });
};