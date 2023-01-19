'use strict';

exports.ok = function(values,res){
    var data ={
        status :200,
        values :values
    }
    res.json(data);
    res.end();
}

exports.error = function(values,res){
    var data ={
        status :400,
        values :values
    }
    res.json(data);
    res.end();
}