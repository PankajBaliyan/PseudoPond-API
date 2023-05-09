const Todo = require("../models/todos-model"),
    casual = require('casual'),
    notifier = require('node-notifier')

//* to get all todo's from database
const getAllToDos = async (req, res) => {
    try {
        const todos = await Todo.find({})
        res.json(todos)
    } catch (error) {
        console.log("error", error)
        res.send("error ", error)
    }
}

//* function to get highest id & will store data after that
async function getNextTodoId() {
    try {
        const maxTodoIdDoc = await Todo.find().sort({ todoId: -1 }).limit(1);
        const nextTodoID = maxTodoIdDoc.length > 0 ? maxTodoIdDoc[0].todoId + 1 : 1;
        return nextTodoID;
    } catch (err) {
        console.error('Error getting the next todo ID', err);
        return 1
    }
}

//* route to create fake date at single click
const createFakeTodo = async (req, res) => {
    const id = req.params.id
    try {
        const todos = [];
        let todoID = await getNextTodoId();
        for (let i = 0; i < id; i++) {
            const title = casual.title,
                status = casual.status;

            const todo = {
                todoId: todoID,
                title: title,
                completedStatus: status,
                createdAt: new Date(),
            };

            todos.push(todo);
            todoID = todoID + 1
        }
        todos.sort((a, b) => a.todoId - b.todoId); // Sort the todos array by todoId

        // loop through the array of todos and use the create method to add each todo to the database
        try {
            await Todo.insertMany(todos);
            console.log('Todos added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Todos Added Successfully!'
            });
            res.send('Todos added successfully to the database')
        } catch (err) {
            console.error('Error adding Todos to the database', err);
            res.send('Error creating Todos DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = {
    getAllToDos,
    createFakeTodo
}