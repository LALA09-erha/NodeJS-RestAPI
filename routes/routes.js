'use strict';

module.exports = function(app){
    //untuk mengimport file controller
    const jsonku = require('../controller/ItemsController');
    // untuk mengecek apakah rest api berjalan
    app.route('/').get(jsonku.index);

    // untuk menampilkan semua data di database
    app.route('/showall').get(jsonku.showalldata);
    
    //untuk menampilkan data berdasarkan id
    app.route('/showbyid/:id').get(jsonku.showbyid);

    //untuk menampilkan data berdasarkan iduser
    app.route('/showbyiduser/:iduser').get(jsonku.showbyiduser);
    
    //untuk menampilkan satu data berdasarkan iduser
    app.route('/showdatabyiduser/:iduser/:namaitem').get(jsonku.showdatabyiduser);
    
    //untuk menampilkan data berdasarkan judul
    app.route('/showbyjudul/:judul').get(jsonku.showbyjudul);

    //untuk mengembalikan jika tidak ada route yang manangani
    app.route('/:route').get(jsonku.notfound);
    
    // untuk mengembalikan jika tidak ada route yang menagani 

    app.route('/:route/:route').get(jsonku.notfound);

    // untuk menambahkan excel to database
    app.route('/export-excel').post(jsonku.exportexcel);

}
