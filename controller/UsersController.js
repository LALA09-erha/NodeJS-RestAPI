
const response = require('../config/response');
const connect = require('../database/connect');
const server = require('../server/server');
const Users = require('../models/UsersModels');

exports.login = function(req,res){
    if(server.validate.validate(req.body.username)){
        connect.connection.query("SELECT * from users where email=?",[req.body.username],function(error,row,fields){
            if(error){
                connect.connection.log(error)
            }else{
                if(row.length>0)
                {
                    if(row[0].password == req.body.password){
                        response.ok(row,res);
                    }else{
                        response.error("Login Gagal" , res)
                    }
                }else{
                    response.error("Login Gagal",res);
                }     
            };
        });
    }else{
        connect.connection.query("SELECT * from users where username=?",[req.body.username],function(error,row,fields){
            if(error){
                connect.connection.log(error)
            }else{
                if(row.length>0)
                {
                    if(row[0].password == req.body.password){
                        response.ok(row,res);
                    }else{
                        response.error("Login Gagal!" , res)
                    }
                }else{
                    response.error("Username / Email Tidak Valid",res);
                }     
            };
        });

    }
}

exports.register = function(req,res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    //check email or not
    if(server.validate.validate(email)){
        // check email already exist or not
        connect.connection.query("SELECT * from users where email=?",[email],function(error,row,fields){
            if(error){
                connect.connection.log(error)
            }else{
                if(row.length>0)
                {
                    response.error("Email Already Exist" , res);
                }else{
                    // check username already exist or not
                    connect.connection.query("SELECT * from users where username=?",[username],function(error,row,fields){
                        if(error){
                            connect.connection.log(error)
                        }else{
                            if(row.length>0)
                            {
                                response.error("Username Already Exist" , res);
                            }else{
                                const role = "Guest";
                                const created_at = new Date();
                                const data = {
                                    'username' :username ,
                                    'email' : email,
                                    'password' : password, 
                                    'role':role,
                                    'created_at' : created_at,
                                    'updated_at' : created_at

                                }
                                var insertUser = Users.insert(data);
                                insertUser.then(function(result){
                                    response.ok("Register Success" , res);
                                }).catch(function(err){
                                    response.error(err,res);
                                })
                            }     
                        };
                    }); 
                }     
            };
        });

    }else{
        response.error("Email Tidak Valid",res)
    }
}