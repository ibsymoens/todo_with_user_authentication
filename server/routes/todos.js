import express from "express";
import * as todoControllers from "../controllers/todos.js";

const router = express.Router();

router.get("/fetchTodos/:id", todoControllers.fetchTodos);
router.post("/createTodo", todoControllers.createTodo);
router.patch("/updateTodo", todoControllers.updateTodo);
router.delete("/deleteTodo/:id", todoControllers.deleteTodo);

export default router;