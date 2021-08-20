import { Request, Response, NextFunction } from "express";
import pool from "../../db"

interface Todo {
    id: Number,
    description: String
}

//create todo
const todos_post = async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const { description, deadline } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (description, deadline, created_at) VALUES($1,$2,$3) RETURNING *",
            [description,deadline,now]
        );

        res.json(newTodo);
    } catch (err) {
        console.log(err.message);
    }
}

//get all todo
const todos_getAll = async (req: Request, res: Response) => {
    try {
        const listTodo = await pool.query(
            "SELECT * FROM todos"
        );

        res.json(listTodo.rows);
    } catch (err) {
        console.log(err.message);
    }
}

//get a todo
const todos_getID = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const { id }  = req.params;
        const listTodo = await pool.query(
            "SELECT * FROM todos WHERE todo_id = $1",
            [id]
        );

        res.json(listTodo.rows);
    } catch (err) {
        console.log(err.message);
    }
}

//update todo
const todos_update = async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const { id }  = req.params;
        const { description, deadline } = req.body;
        await pool.query(
            "UPDATE todos SET description = $1, deadline = $2, updated_at= $3 where todo_id = $4",
            [description, deadline, now, id]
        );

        res.json("succes update");
    } catch (err) {
        console.log(err.message);
    }
}

//delete todo
const todos_delete = async (req: Request, res: Response) => {
    try {
        console.log(req.params);
        const { id }  = req.params;

        await pool.query(
            "DELETE FROM todos WHERE todo_id = $1",
            [id]
        );

        res.json("succes delete");
    } catch (err) {
        console.log(err.message);
    }
}

export default {
    todos_post,
    todos_getAll,
    todos_getID,
    todos_update,
    todos_delete
};