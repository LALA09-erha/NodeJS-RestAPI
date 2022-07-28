'use strict';

module.exports = function(app){
    const jsonku = require('./controller');
    app.route('/').get(jsonku.index);
    app.route('/showall').get(jsonku.showalldata);
}
