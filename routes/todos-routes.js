const express = require('express')
const { getAllToDos, createFakeTodo } = require('../controllers/todos-controllers')
const router = express.Router()

router.get('/todos', getAllToDos)

router.get('/todos/create/:id', createFakeTodo)

module.exports = router