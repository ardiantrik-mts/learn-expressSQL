const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//Route

//create todo
app.post("/todos", async (req, res) => {
    try {
        
        console.log(req.body);

        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todos (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo);
    } catch (err) {
        console.log(err.message);
    }
})

//get all todo
app.get("/todos", async (req, res) => {
    try {
        const listTodo = await pool.query(
            "SELECT * FROM todos"
        );

        res.json(listTodo.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//get a todo
app.get("/todos/:id", async (req, res) => {
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
})

//update todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id }  = req.params;
        const { description } = req.body;
        await pool.query(
            "UPDATE todos SET description = $1 where todo_id = $2",
            [description, id]
        );

        res.json("succes update");
    } catch (err) {
        console.log(err.message);
    }
})

//delete todo
app.delete("/todos/:id", async (req, res) => {
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
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
})