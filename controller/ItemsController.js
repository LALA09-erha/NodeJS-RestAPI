'use strict';

const response = require('../config/response');
const connect = require('../database/connect');
const server = require('../server/server');
const Items = require('../models/ItemsModels');

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
    connect.connection.query("SELECT * FROM items WHERE namaitem LIKE ?",['%'+judul+'%'],function(error,row,fields){
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
    if(!req.files){
        response.error("Tidak ada file yang di upload",res);
    }else{
        var file = req.files.files;
        var filename = req.files.files.name;
        var iduser = req.body.iduser;
        var path = 'public/files/'+filename;
        // get extension file
        var ext = filename.split('.').pop();
        if(ext == "xlsx" || ext == "xls" || ext == "csv" || ext == "xlsm" || ext == "xltx" || ext == "xltm" || ext == "xlsb" || ext == "xlam" || ext == "xla" || ext == "xlw" || ext == "xlr"){
            file.mv(path,function(error){
                if(error){
                    response.error(error,res);
                }else{
                var workbook = server.xlsx.readFile(path);
                var sheet_name_list = workbook.SheetNames;
                var xlData = server.xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                var items = [];
                var err = undefined;
                for(var i=0;i<xlData.length;i++){
                    if(Object.keys(xlData[0]).length != 2){
                        err = "Format excel salah";
                        break;
                    }else{
                        items.push(xlData[i].namaitem);
                    }
                }
                // check err undifined
                if(err == "Format excel salah"){
                    response.error("Format excel salah",res);
                }else{
                //get nama items from database berdasarkan iduser
                var namaitems = Items.getnamaitem(iduser);
                namaitems.then(function(result){
                    const itemss = [];
                    // insert result to array itemss
                    for (const key in result) {
                      if (result.hasOwnProperty(key)) {
                        const element = result[key];
                        if(itemss.includes(element.namaitem) == false){
                          itemss.push(element.namaitem);
                        }
                      }
                    }
                    const session_id = Math.floor(Date.now() / 1000);
                    // check result items  
                    const temp = [];
                    for (i = 0; i < items.length; i++) {
                        var checknama = Items.updatejumlahitem(items[i],iduser);
    
                        checknama.then(function (result) {
                        //get namaitem di result        
                        if(result.length == 0){
                            //// save to db 
                            // mengambil data sheet pertama
                            var xlData = server.xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                            response.ok(xlData,res);
                            // parsing data
                            // for (const key in xlData) {
                            //     if (xlData.hasOwnProperty(key)) {
                            //         const element = xlData[key];
                            //         var deff = items.filter(x => !itemss.includes(x));
                            //         if(deff.includes(element.namaitem) == true){
                            //             if(temp.includes(element.namaitem) == false){
                            //                 temp.push(element.namaitem);
                            //                 //insert data to db
                            //                 element.iduser = iduser;
                            //                 element.idsession = session_id;
                            //                 var item = Items.insert(element);
                            //                 item.then(function (result) {
                            //                     //berhasil update
                            //                 }).catch(function (err) {
                            //                     response.error(err,res);
                            //                 });
                            //             }
                            //         }
                            //     }  
                            // }
                        }else{
                            //mengambil jumlahitem dari result 
                            var jumlahitem = result[0].jumlahitem;
                            //mengambil data sheet pertama
                            var xlData = server.xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
                            console.log(xlData);
                            response.ok(xlData,res);
                            // for (const key in xlData) {
                            //     if (xlData.hasOwnProperty(key)) {
                            //         const element = xlData[key];
                            //         if(element.namaitem == result[0].namaitem){
                            //         jumlahitem = Number(jumlahitem) + Number(element.jumlahitem);
                            //         //update jumlah item
                            //         var updatejumlah = Items.updatejumlahitemfix(jumlahitem,element.namaitem,iduser,session_id);
                            //         updatejumlah.then(function (result) {
                            //         }
                            //           //berhasil update   
                            //         ).catch(function (err) {
                            //             response.error(err,res);
                            //         });
                            //         }}
                            // }
                        }
    
                    }).catch(function (err) {
                        response.error(err,res);
                    });
                }
                
            }).catch(function(err){
                response.error(err,res);
            });
            response.ok("Data Berhasil Di Tambahkan",res);
            }
            }
        });
        }else{
            response.error("Format file tidak didukung",res);
        }
    }

}

exports.create = function(req,res){
    var data = req.body.data
    var new_data = req.body.new_data

    // console.log(data);
    // console.log(new_data);  
    var createItem = Items.createItem(data,new_data);
    createItem.then(function(result){
        response.ok(result,res);
    }).catch(function(err){
        response.ok(err,res);
    })
}