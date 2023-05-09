const mongoose = require('mongoose')

const todosSchema = new mongoose.Schema({
    todoId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    completedStatus: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Todo', todosSchema)