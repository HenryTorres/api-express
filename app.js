import express from 'express';
import { cursos } from './data/data.js';

//Creamos una instancia de express
const app = express();

//Definimos el dominio de la API
const host = '127.0.0.1';

//Definimos el puerto de la API
const port = 3000;

//Configuramos express para que pueda recibir datos en formato JSON
app.use(express.json());

//Metodo GET: Bienvenida a la API:
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de cursos');
});

//Metodo GET: Listar todos los cursos
app.get('/cursos', (req, res) => {
    res.json(cursos);
});

//Metodo GET: Listar un curso por su id
app.get('/cursos/:id', (req, res) => {

    //Obtenemos el id del curso desde la URL
    const id = parseInt(req.params.id);

    //Validamos que el id sea un número
    if (isNaN(id)) 
        return res.status(400).json({error: 'ID de curso inválido'});
    
    //Buscamos el curso por su id
    const curso = cursos.find(item => item.id === id);
    
    //Validamos si el curso no existe
    if (!curso)
        return res.status(404).json({error: 'Curso no encontrado'});

    //Retornamos el curso encontrado
    res.status(200).json(curso);
})

// Método POST: Crear un nuevo curso
app.post('/cursos', (req, res) => {

    // Extraemos los datos del cuerpo de la solicitud
    const nuevoCurso = req.body;

    // Validamos que el cuerpo de la solicitud tenga un ID y un nombre
    if (!nuevoCurso.duracion || !nuevoCurso.nombre) 
        return res.status(400).json({ error: 'Faltan datos obligatorios'});

    // Verificamos si ya existe un curso con el mismo nombre
    if (cursos.some(item => item.nombre === nuevoCurso.nombre)) 
        return res.status(400).json({ error: `Ya existe un curso con el id`});

    // Agregamos el nuevo curso al arreglo
    cursos.push(nuevoCurso);

    // Respondemos con un código 201 (Created) y el curso creado
    res.status(201).json(nuevoCurso);
});

// Método PUT: Actualiza un curso existente
app.put('/cursos/:id', (req, res) => {

    // Extraemos el ID de los parámetros de la URL
    const id = parseInt(req.params.id);

    // Extraemos los datos del cuerpo de la solicitud
    const cursoActualizado = req.body;

    // Buscamos el curso en el arreglo
    const index = cursos.findIndex(item => item.id === id);
    
    // Si no se encuentra el curso, respondemos con un error 404
    if (index === -1) 
        return res.status(404).json({ error: 'Curso no encontrado' });

    // Actualizamos los datos del curso
    cursos[index].nombre = cursoActualizado.nombre;

    // Respondemos con el curso actualizado
    res.json(cursos[index]);
});

// Método DELETE: Eliminar un curso
app.delete('/cursos/:id', (req, res) => {
    // Extraemos el ID de los parámetros de la URL
    const id = parseInt(req.params.id);

    // Buscamos el índice del curso en el arreglo
    const cursoIndex = cursos.findIndex(item => item.id === id);

    // Si no se encuentra el curso, respondemos con un error 404
    if (cursoIndex === -1) {
        return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Eliminamos el curso del arreglo
    cursos.splice(cursoIndex, 1);

    // Respondemos con un código 204 (No Content) para indicar que se eliminó correctamente
    res.status(204).send();
});

//Ponemos el servidor a escuchar en el puerto y host definido
app.listen(port, host, () => {
    console.log(`Servidor ejecutandose en http://${host}:${port}`);
});
