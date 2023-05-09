const express = require('express'),
    mongoose = require('mongoose')
const app = express();


//! DotEnv Configure & Environment Variables
require('dotenv').config();
const PORT = process.env.PORT
const URI = process.env.DATABASE_URI

//! DataBase Setup
mongoose.connect(URI)
    .then(() => {
        console.log("Connected to MongoDB database")

    }).catch((error) => {
        console.log("Error connecting to MongoDB database", error)
    })

//! Home route
app.get('/', (req, res) => {
    res.send("Hey user, Welcome to PseudoPond API")
})

//! Routes Setup
const usersRoute = require('./routes/users-routes'),
    todosRoute = require('./routes/todos-routes'),
    photosRoute = require('./routes/photos-routes');
app.use(usersRoute)
app.use(todosRoute)
app.use(photosRoute)

//! Server Setup
app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`)
})
