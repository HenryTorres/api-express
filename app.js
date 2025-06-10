import express from 'express';
import 'dotenv/config';

import { cursos } from './data/data.js';
import cursosRouter from './routes/cursos-router.js'
import profesorRouter from './routes/profesor-router.js';

//Creamos una instancia de express
const app = express();

//Definimos el dominio de la API
const host = process.env.HOST;

//Definimos el puerto de la API
const port = process.env.PORT;

//Configuramos express para que pueda recibir datos en formato JSON
app.use(express.json());

//Configuramos el ruteador
app.use('/courses', cursosRouter);
app.use('/teachers', profesorRouter);

//Ponemos el servidor a escuchar en el puerto y host definido
app.listen(port, host, () => {
    console.log(`Servidor ejecutandose en http://${host}:${port}`);
});