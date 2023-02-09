'use strict';



// response ok for all feedback to client success
exports.ok = function(values,res){
    res.status(200).json({
        status :200,
        values :values
    });
    res.end();
}

// response error for all feedback to client errorss
exports.error = function(values,res){
    res.status(400).json({
        status :400,
        values :values
    });
    res.end();
}

// response not found  for all feedback to client if halaman not found
exports.notfound = function(values,res){
    res.status(404).json({
        status:404,
        values:values
    });
    res.end();
}