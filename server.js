const express = require('express')
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())
const path = require("path")
const dbPath = path.join(__dirname, "simpleTodos.db")
const {open} = require('sqlite')
const Database = require('better-sqlite3')
const db = new Database(dbPath, { verbose: console.log });


app.listen(4000, () => {
            console.log("Server Running at http://localhost:4000/")
     })
  


app.get("/todos", (request, response) => {
    const getTodosQuery = `SELECT * FROM todos`;
    const todosArray =  db.prepare(getTodosQuery).all()
    response.send(todosArray)
})

app.delete("/todos/:todoId/", (request, response) => { 
    const {todoId} = request.params
    const deleteTodosQuery = `DELETE FROM todos WHERE id=${todoId}`;
     db.prepare(deleteTodosQuery).run()
    response.send("Todo Deleted Successfully")

})

app.post("/todos",  (request, response) => {
    const todoDetails = request.body 
    const {title} = todoDetails
    const addTodoQuery = `INSERT INTO todos (title) VALUES (
                                '${title}'
                                );`;
    db.prepare(addTodoQuery).run()
    response.send("Todo Added Successfully")
})

