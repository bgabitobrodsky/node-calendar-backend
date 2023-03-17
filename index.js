const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config(); //variables de entorno del .env
const cors = require('cors');

//crear el servidor de express
const app = express();

// DataBase
dbConnection();

//CORS
app.use( cors() );

//lectura y parseo de body
app.use( express.json() );

//directorio publico
app.use( express.static('public') );

// rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//escuchar peticiones
app.listen( process.env.PORT, console.log(`Servidor corriendo en puerto ${process.env.PORT}`));