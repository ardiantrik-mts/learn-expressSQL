import express from "express";
import todos from "../controllers/todos.controller";

const router = express.Router();

router.post('/todos', todos.todos_post)
router.get('/todos', todos.todos_getAll)
router.get('/todos/:id', todos.todos_getID)
router.put('/todos/:id', todos.todos_update)
router.delete('/todos/:id', todos.todos_delete)

export default router;
