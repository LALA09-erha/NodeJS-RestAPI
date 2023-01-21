'use strict';

module.exports = function(app){
    //untuk mengimport file Itemscontroller
    const Items = require('../controller/ItemsController');

    //untuk mengimport file UserController
    const User = require('../controller/UsersController');
    
    // untuk mengecek apakah rest api berjalan
    app.route('/').get(Items.index);

    // untuk menampilkan semua data di database
    app.route('/showall').get(Items.showalldata);
    
    //untuk menampilkan data berdasarkan id
    app.route('/showbyid/:id').get(Items.showbyid);

    //untuk menampilkan data berdasarkan iduser
    app.route('/showbyiduser/:iduser').get(Items.showbyiduser);
    
    //untuk menampilkan satu data berdasarkan iduser
    app.route('/showdatabyiduser/:iduser/:namaitem').get(Items.showdatabyiduser);
    
    //untuk menampilkan data berdasarkan judul
    app.route('/showbyjudul/:judul').get(Items.showbyjudul);

    //untuk mengembalikan jika tidak ada route yang manangani
    app.route('/:route').get(Items.notfound);
    
    // untuk menambahkan excel to database
    app.route('/export-excel').post(Items.exportexcel);
    
    //route for login
    app.route('/login').post(User.login)
    
    //route for register
    app.route('/register').post(User.register)
    
    // untuk mengembalikan jika tidak ada route yang menagani 
    app.route('/:route/(*)').get(Items.notfound);
}
