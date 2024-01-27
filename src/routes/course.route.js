import { Router } from "express";
import Courses from "../dao/dbManager/course.js";

const router = Router();

const courses = new Courses();/* inicializamos una new class de Courses */

router.get("/", async (req, res) => {/* CRUD  diferencias entre get1 */
  try {
    const response = await courses.getAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {/* getById...lo llamo x su id y me trae solo ese objeto */
  const { id } = req.params;

  try {
    const response = await courses.getById(id);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {/* Post para crear el nuevo curso(no existe) */
  const { title, description, teacher, students } = req.body;
  try {
    const response = await courses.saveCourse({
      title,
      description,
      teacher,
      students,
    });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {//Put..1:34  es para poder editar o modif (recibimos en el ruta el id, asi te encuentro en la BdD)
  /* para editarlo requiero el id, envienme mediante un parametro en la ruta y por medio del body(request) el new object */
 /* param para encontrarlo - body para modificarlo- 
 para ello debemos ejecutar UpdateOne desde el DBManager para modificarlo(localiza un elem x el id y lo actualiza) */
  const { id } = req.params;
  const { title, description, teacher, students } = req.body;

  try {//async
    const newCourse = { title, description, teacher, students };

    const response = await courses.updateCourse(id, newCourse);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;/* elimina x id- recibe el id-(el id sale del params ej id/time) */
    const response = await courses.deleteCourse(id);/* ejecuto el metodo deleteCourse */
    /* params se usa para librerias /: casos donde necesitas + de un param tupagina.com/prod
    con querys con params cuando es más epecifico lib/cuadernos */
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

export default router;
