const Todo = require("../models/todos-model"),
    casual = require('casual'),
    notifier = require('node-notifier')

//* to get all todo's from database
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        res.status(500).send('Server Error');
    }
};

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
exports.createTodo = async (req, res) => {
    const id = req.params.id
    try {
        const todos = [];
        let todoId = await getNextTodoId();
        for (let i = 0; i < id; i++) {

            const todo = {
                todoId,
                todoTitle: casual.title,
                todoDescription: casual.sentences(n = 2),
                todoDueDate: casual.date('YYYY-MM-DD'),
                todoStatus: casual.random_element(['Pending', 'Complete']),
                createdAt: casual.date('YYYY-MM-DDTHH:mm:ssZ'),
            };

            todos.push(todo);
            todoId = todoId + 1
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
};

exports.updateTodo = async (req, res) => {
    // const { todoTitle, todoDescription, todoDueDate, todoStatus } = req.body;

    // const todoFields = {};
    // if (todoTitle) todoFields.todoTitle = todoTitle;
    // if (todoDescription) todoFields.todoDescription = todoDescription;
    // if (todoDueDate) todoFields.todoDueDate = todoDueDate;
    // if (todoStatus) todoFields.todoStatus = todoStatus;

    // try {
    //     let todo = await Todo.findById(req.params.id);
    //     if (!todo) {
    //         return res.status(404).json({ msg: 'Todo not found' });
    //     }

    //     todo = await Todo.findByIdAndUpdate(
    //         req.params.id,
    //         { $set: todoFields },
    //         { new: true }
    //     );

    //     res.json(todo);
    // } catch (err) {
    //     console.error(err.message);
    //     if (err.kind === 'ObjectId') {
    //         return res.status(404).json({ msg: 'Todo not found' });
    //     }
    //     res.status(500).send('Server Error');
    // }
};

exports.deleteTodo = async (req, res) => {
    // try {
    //     const todo = await Todo.findById(req.params.id);
    //     if (!todo) {
    //         return res.status(404).json({ msg: 'Todo not found' });
    //     }
    //     await todo.remove();
    //     res.json({ msg: 'Todo removed' });
    // } catch (err) {
    //     console.error(err.message);
    //     if (err.kind === 'ObjectId') {
    //         return res.status(404).json({ msg: 'Todo not found' });
    //     }
    //     res.status(500).send('Server Error');
    // }
};
