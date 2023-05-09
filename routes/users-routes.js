const express = require('express')
const { getAllUsers, createFakeUsers } = require('../controllers/users-controllers');
const router = express()

router.get('/users', getAllUsers)

router.get('/users/create/:id', createFakeUsers)

module.exports = router