'use strict';

const bodyParser = require('body-parser');
const express = require('express'); 
const fileUpload = require('express-fileupload');
const cors = require('cors');
exports.validate = require('email-validator');
const app = express();
exports.xlsx = require('xlsx');

// membuat server
app.use(cors({
    origin: '*'
}));

// app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());

//panggil routes

const routes = require('../routes/routes');
routes(app);    

const port = process.env.PORT || 3000;  
app.listen(port, () => {
    console.log('Server berjalan di port '+port);
});