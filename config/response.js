'use strict';

exports.ok = function(values,res){
    res.status(200).json({
        status :200,
        values :values
    });
    res.end();
}

exports.error = function(values,res){
    res.status(400).json({
        status :400,
        values :values
    });
    res.end();
}

exports.notfound = function(values,res){
    res.status(404).json({
        status:404,
        values:values
    });
    res.end();
}