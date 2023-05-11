const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoId: {
        type: Number,
        required: true
    },
    todoTitle: {
        type: String,
        required: true
    },
    todoDescription: {
        type: String,
        required: true
    },
    todoDueDate: {
        type: Date,
        required: true
    },
    todoStatus: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;