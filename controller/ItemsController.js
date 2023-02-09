'use strict';

const response = require('../config/response');
const connect = require('../database/connect');
const server = require('../server/server');
const Items = require('../models/ItemsModels');
const Moment = require('moment')

//untuk mengecek apakah rest api berjalan
exports.index = function(req,res){
    response.ok("APLIKASI REST API BERHASIL DI JALANKAN",res);
}


// untuk menampilkan semua data di data base

exports.showalldata = function(req,res){
    connect.connection.query("SELECT * from items",function(error,row,fields){
        if(error){
            connect.connection.log(error)
        }else{
            if(row.length>0)
            {
                response.ok(row,res);
            }else{
                response.error("Data tidak ditemukan",res);
            }     
        };
    });
};

// untuk menampilkan data berdasarkan id

exports.showbyid = function(req,res){
    var id = req.params.id;
    connect.connection.query("SELECT * from items where iditem=?",[id],function(error,row,fields){
        if(error){
            response.error(error,res);
        }
        else{
            if(row.length>0)
            {
                response.ok(row,res);
            }else{
                response.error("Data tidak ditemukan",res);
            }        
        };
    });
};


//untuk menampilkan data berdasarkan iduser
exports.showbyiduser= function(req,res){
    var iduser = req.params.iduser;
    connect.connection.query("Select * from items where iduser=?",[iduser], function(error,row,fields){
        if(error){
            response.error(error,res);  
        }else{
            if(row.length > 0){
                response.ok(row,res)
            }else{
                response.error("Data Tidak Ditemukan",res)
            }
        }
    })
}

//untuk menampilkan satu data berdasarkan iduser
exports.showdatabyiduser= function(req,res){
    var iduser = req.params.iduser;
    var namaitem = req.params.namaitem;
    connect.connection.query("Select * from items where iduser=? and namaitem=?",[iduser,namaitem], function(error,row,fields){
        if(error){
            response.error(error,res);  
        }else{
            if(row.length > 0){
                response.ok(row,res)
            }else{
                response.error("Data Tidak Ditemukan",res)
            }
        }
    })
}


// untuk menampilkan data berdasarkan judul
exports.showbyjudul = function(req,res){
    var judul = req.params.judul;
    // console.log(judul)
    connect.connection.query("SELECT * FROM items WHERE namaitem= ?",[judul],function(error,row,fields){
        if(error){
            connect.connection.log(error);
        }else{
            if(row.length>0)
            {
                response.ok(row,res);
            }else{
                response.error  ("Data tidak ditemukan",res);
            }
        }
    });
};


//menangani halaman not faund
exports.notfound = function(req,res){
    response.notfound("Halaman tidak ditemukan",res);
}

// menambahkan excel to database
exports.exportexcel = function(req,res){
        var iduser = req.body.iduser;
        var data = req.body.data;
        console.log(req.body);
        
        // get nama item from data
        var items = [];
        var err = undefined;
        // console.log(req.body.data);
        for(var i=0;i<data.length;i++){
            if(Object.keys(data[i]).length != 3 ){
                err = "Format excel salah";
                break;
            }else{
                items.push(data[i].namaitem);
            }
        }
        // console.log(err);
        // check err undifined
        if(err == "Format excel salah"){ 
            // console.log(1)
            response.error("Format excel salah",res);
        }else{
            //get nama items from database berdasarkan iduser
            var namaitems = Items.getnamaitem(iduser);
            namaitems.then(function(result){
                var itemsfromdb = [];
                for(const key in result){
                    if(result.hasOwnProperty(key)){
                        const element = result[key];
                        if(itemsfromdb.includes(element.namaitem) == false){
                            itemsfromdb.push(element.namaitem);
                        }
                    }
                }

                // make id session 
                const session_id = Math.floor(Date.now() / 1000);
                //check result items
                const temp = [];
                for(var i=0;i<items.length;i++){
                    //check nama items to database
                    var checknama = Items.updatejumlahitem(items[i],iduser);
                    checknama.then(function(result){
                        if(result.length ==0){
                            // insert data to database
                            for(const key in data){
                                if(data.hasOwnProperty(key)){
                                    const element = data[key];
                                    var deff = items.filter(x => !itemsfromdb.includes(x));
                                    if(deff.includes(element.namaitem) == true){
                                        if(temp.includes(element.namaitem) == false){
                                            temp.push(element.namaitem);
                                            //insert to database
                                            element.iduser = iduser;
                                            element.idsession = session_id;
                                            delete element.index;
                                            var insertitems = Items.insert(element);
                                            insertitems.then(function(result){
                                                // console.log("sukses");
                                            }).catch(function(err){
                                                console.log(2)
                                                response.error(err,res);
                                            })
                                        }
                                    }
                                }
                            }
                        }else{
                             //mengambil jumlahitem dari result 
                             var jumlahitem = result[0].jumlahitem;
                             //mengambil namaitem dari result
                             for (const key in data){
                                if(data.hasOwnProperty(key)){
                                    const element = data[key];
                                    if(element.namaitem == result[0].namaitem){
                                        //update jumlahitem
                                        var jumlahitemupdate = Number(jumlahitem) + Number(element.jumlahitem);
                                        var updatejumlahitem = Items.updatejumlahitemfix(jumlahitemupdate,element.namaitem,iduser,session_id);
                                        updatejumlahitem.then(function(result){
                                            // console.log("sukses");       
                                        }).catch(function(err){
                                            console.log(3)
                                            response.error(err,res);
                                        })
                                    }
                                }
                             }
                        }
                    }).catch(function(err){
                        console.log(4)
                        response.error(err,res);
                    });
                }
                response.ok("Data Berhasil Ditambahkan",res);

            }).catch(function(err){
                console.log(5)
                response.error(err,res);
            });
        }
    }


// menghapus data berdasarkan id dri tabel view
exports.delete = function(req,res){

    var id = req.params.id;
    var data = req.body.data;
    // delete data by id item 
    var deleteitem = Items.deleteview(data,id);
    deleteitem.then(function(result){
        response.ok(result,res);
    }).catch(function(err){
        response.error(err,res);
    });
}

// mengedit data berdasarkan id dari tabel view

exports.edit = function (req,res){
    var data = req.body.data;
    var new_data = req.body.new_data;
    var id = req.params.id;
    
    //edit data by id item
    var edititem = Items.editview(data,id , new_data);
    edititem.then(function(result){
        response.ok(result,res);
    }).catch(function(err){
        response.ok(err,res);
    })
}

exports.create = function(req,res){
    var data = req.body.data
    var new_data = req.body.new_data

    var createItem = Items.createItem(data,new_data);
    createItem.then(function(result){
        response.ok(result,res);
    }).catch(function(err){
        response.ok(err,res);
    })
}

// check header csv
exports.checkheadercsv = function(req,res){
    var data = req.body;
    console.log(data)
    var err = 0;
    for(var i=0;i<data.length;i++){
        if(Object.keys(data[i]).length != 2 ){
            if(Object.keys(data[i]).includes("namaitem") == true && Object.keys(data[i]).includes("jumlahitem") == true){
                continue;
            }else{
                err =+ 1;
            }
        }else{
            if(Object.keys(data[i]).includes("namaitem") == true && Object.keys(data[i]).includes("jumlahitem") == true){
                continue;
            }else{
                err =+ 1;
            }
        } 
    }

    if(err == 0 ){
        for(var i=0;i<data.length;i++){
            data[i]['index'] = i;
        }
        response.ok(data,res);
    }else{
        response.error("Format Excel Salah",res);
    }
}


exports.formatmoment =function(req,res){
    var data = req.body.data;
    var date = Moment(data).format('DD-MM-YYYY/HH:mm:ss');
    response.ok(date,res);
}   