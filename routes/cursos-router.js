import { Router } from 'express';
import cursosController from '../controllers/cursos-controller.js'

// Instanciamos el ruteador de cursos
const cursosRouter = Router();

//Metodo GET: Listado de cursos
cursosRouter.get('/', cursosController.getCursos);

//Metodo GET: Listar un curso por su id
cursosRouter.get('/:id', cursosController.getCursoById);

// Método POST: Crear un nuevo curso
cursosRouter.post('/', cursosController.createCurso);

// Método PUT: Actualiza un curso existente
cursosRouter.put('/:id', cursosController.updateCurso);

// Método DELETE: Eliminar un curso
cursosRouter.delete('/:id', cursosController.deleteCurso);

// cursosRouter.route('/:id')
//     .get(cursosController.getCursoById)
//     .put(cursosController.updateCurso)
//     .delete(cursosController.deleteCurso);

export default cursosRouter;

