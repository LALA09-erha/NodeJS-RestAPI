'use strict';

const response = require('./response');
const connect = require('./connect');

exports.index = function(req,res){
    response.ok("APLIKASI REST API BERHASIL DI JALANKAN",res);
}