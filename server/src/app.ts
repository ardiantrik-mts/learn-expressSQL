import express from "express";
import cors from  "cors";

import todos from "./src/routes/todos.router"

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use('/',[todos])

app.get('/', (req, res) => {
    res.send("Hello")
})



app.listen(5000, () => {
    console.log("server has started on port 5000");
})