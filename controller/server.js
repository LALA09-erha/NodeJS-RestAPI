const bodyParser = require('body-parser');
const express = require('express'); 
const app = express();

// membuat server
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//panggil routes

const routes = require('./routes');
routes(app);


app.listen(3000, () => {
    console.log('Server berjalan di port 3000');
});