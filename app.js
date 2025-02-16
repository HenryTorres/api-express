import express from 'express';
import { cursos } from './data/data.js';
import cursosRouter from './routes/cursos-router.js'
import profesorRouter from './routes/profesor-router.js';

//Creamos una instancia de express
const app = express();

//Definimos el dominio de la API
const host = '127.0.0.1';

//Definimos el puerto de la API
const port = 3000;

//Configuramos express para que pueda recibir datos en formato JSON
app.use(express.json());

//Configuramos el ruteador para los cursos
app.use('/cursos', cursosRouter);
app.use('/profesores', profesorRouter);

//Ponemos el servidor a escuchar en el puerto y host definido
app.listen(port, host, () => {
    console.log(`Servidor ejecutandose en http://${host}:${port}`);
});
