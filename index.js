const express = require('express');
require('dotenv').config(); //variables de entorno del .env

//crear el servidor de express
const app = express();

//directorio publico
app.use( express.static('public') );

// rutas


//escuchar peticiones
app.listen( process.env.PORT, console.log(`Servidor corriendo en puerto ${process.env.PORT}`));