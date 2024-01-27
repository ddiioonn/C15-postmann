import { Router } from "express";
import Users from "../dao/dbManager/user.js";
import Courses from "../dao/dbManager/course.js";

const router = Router();
/* mi handlebars recibe la var users */
/* las vistas van a responder bajo el directorio raiz */
router.get("/users", async (req, res) => {
  const users = new Users();/* creo la vista Users, lo importo, lo hago async y guardo el result de getAll(guarda todos) */
  const result = await users.getAll();
  res.render("users", { users: result });
});

router.get("/courses", async (req, res) => {
  const courses = new Courses();
  const result = await courses.getAll();
  res.render("courses", { courses: result });
});

export default router;
