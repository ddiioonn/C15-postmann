import { Router } from "express";
import Users from "../dao/dbManager/user.js";
/* 1:40 a 1:50 user.route es lo mismo que course.route */
/* user.route = course.route */
const router = Router();
const users = new Users();/* creo e inicializo la clase de user */

router.get("/", async (req, res) => {
  const result = await users.getAll();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await users.getById(req.params.id);
  res.json(result);
});

router.post("/", async (req, res) => {/* Post. Agregar o Crear */
  try {
    const { first_name, last_name, email, dni, age, course } = req.body;

    const result = await users.saveUser({
      first_name,
      last_name,
      email,
      dni,
      age,
      course,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, dni, age, course } = req.body;

    const newUser = { first_name, last_name, email, dni, age, course };
    const response = await users.updateUser(id, newUser);

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await users.deleteUser(id);

    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

export default router;
