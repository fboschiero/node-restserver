require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Configuracion global de rutas
app.use(require('./routes/index'));


app.get('/', function(req, res) {
    res.json('Hello World')
})

mongoose.connect(process.env.URL_DB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');

    });


app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto: `, process.env.PORT);

});