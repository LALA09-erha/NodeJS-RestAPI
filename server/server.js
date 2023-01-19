'use strict';

const bodyParser = require('body-parser');
const express = require('express'); 
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
exports.xlsx = require('xlsx');

// membuat server
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload());

//panggil routes

const routes = require('../routes/routes');
routes(app);

const port = process.env.PORT || 3001;  
app.listen(port, () => {
    console.log('Server berjalan di port '+port);
});1