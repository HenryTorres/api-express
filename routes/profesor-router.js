import { Router } from 'express';
import { profesores } from '../data/data.js';

// Instanciamos el ruteador de cursos
const profesorRouter = Router();

//Metodo GET: Listado de cursos
profesorRouter.get('/', (req, res) => {
    res.json(profesores);
});

//Metodo GET: Listar un profesor por su id
profesorRouter.get('/:id', (req, res) => {

    //Obtenemos el id del curso desde la URL
    const id = parseInt(req.params.id);

    //Validamos que el id sea un número
    if (isNaN(id)) 
        return res.status(400).json({error: 'ID de profesor inválido'});
    
    //Buscamos el curso por su id
    const curso = profesores.find(item => item.id === id);
    
    //Validamos si el curso no existe
    if (!curso)
        return res.status(404).json({error: 'Profesor no encontrado'});

    //Retornamos el curso encontrado
    res.status(200).json(curso);
});

// Método POST: Crear un nuevo profesor
profesorRouter.post('/', (req, res) => {

    // Extraemos los datos del cuerpo de la solicitud
    const nuevoProfesor = req.body;

    // Validamos que el cuerpo de la solicitud tenga un ID y un nombre
    if (!nuevoProfesor.nombre || !nuevoProfesor.especialidad) 
        return res.status(400).json({ error: 'Faltan datos obligatorios'});

    // Verificamos si ya existe un curso con el mismo nombre
    if (profesores.some(item => item.nombre === nuevoProfesor.nombre)) 
        return res.status(400).json({ error: `Ya existe un profesor con el id`});

    // Agregamos el nuevo curso al arreglo
    profesores.push(nuevoProfesor);

    // Respondemos con un código 201 (Created) y el curso creado
    res.status(201).json(nuevoProfesor);
});

// Método PUT: Actualiza un profesor existente
profesorRouter.put('/:id', (req, res) => {

    // Extraemos el ID de los parámetros de la URL
    const id = parseInt(req.params.id);

    // Extraemos los datos del cuerpo de la solicitud
    const profesorActualizado = req.body;

    // Buscamos el curso en el arreglo
    const index = profesores.findIndex(item => item.id === id);
    
    // Si no se encuentra el curso, respondemos con un error 404
    if (index === -1) 
        return res.status(404).json({ error: 'Profesor no encontrado' });

    // Actualizamos los datos del curso
    profesores[index].nombre = profesorActualizado.nombre;
    profesores[index].especialidad = profesorActualizado.especialidad;

    // Respondemos con el curso actualizado
    res.json(profesores[index]);
});

// Método DELETE: Eliminar un curso
profesorRouter.delete('/:id', (req, res) => {
    // Extraemos el ID de los parámetros de la URL
    const id = parseInt(req.params.id);

    // Buscamos el índice del curso en el arreglo
    const profesorIndex = profesores.findIndex(item => item.id === id);

    // Si no se encuentra el curso, respondemos con un error 404
    if (profesorIndex === -1) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Eliminamos el profesor del arreglo
    profesores.splice(profesorIndex, 1);

    // Respondemos con un código 204 (No Content) para indicar que se eliminó correctamente
    res.status(204).send();
});

export default profesorRouter;

