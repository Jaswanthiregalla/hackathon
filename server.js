const express = require('express')
const app = express()
app.use(express.json())
const path = require("path")
const dbPath = path.join(__dirname, "simpleTodos.db")
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
let db = null 



const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(4000, () => {
            console.log("Server Running at http://localhost:4000/")
        })
    }
   catch(e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1);
   }
}
initializeDBAndServer()

app.get("/todos", async (request, response) => {
    const getTodosQuery = `SELECT * FROM todos`;
    const todosArray = await db.all(getTodosQuery)
    response.send(todosArray)
})

app.delete("/todos/:todoId/", async (request, response) => { 
    const {todoId} = request.params
    const deleteTodosQuery = `DELETE FROM todos WHERE id=${todoId}`;
    await db.run(deleteTodosQuery) 
    response.send("Todo Deleted Successfully")

})

app.post("/todos", async (request, response) => {
    const todoDetails = request.body 
    const {title} = todoDetails
    const addTodoQuery = `INSERT INTO todos (title) VALUES (
                                '${title}'
                                );`;
    await db.run(addTodoQuery)
    response.send("Todo Added Successfully")

})

