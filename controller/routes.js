'use strict';

module.exports = function(app){
    //untuk mengimport file controller
    const jsonku = require('./controller');
    // untuk mengecek apakah rest api berjalan
    app.route('/').get(jsonku.index);


    // untuk menampilkan semua data di database
    app.route('/showall').get(jsonku.showalldata);
    
    //untuk menampilkan data berdasarkan id
    app.route('/showbyid/:id').get(jsonku.showbyid);
}
