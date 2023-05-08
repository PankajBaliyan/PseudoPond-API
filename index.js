const express = require('express'),
    mongoose = require('mongoose');
const app = express();

//! DotEnv Configure & Environment Variables
require('dotenv').config();
const PORT = process.env.PORT
const URI = process.env.DATABASE_URI

//! DataBase Setup
mongoose.connect(URI)
    .then(() => {
        console.log("DataBase Connected")
    }).catch((error) => {
        console.log("Error While connecting DataBase", error)
    })

//! Home route
app.get('/', (req, res) => {
    res.send("Hey user, Welcome to PseudoPond API")
})

//! Routes Setup
const namesRoutes = require('./routes/name-routes');
app.use(namesRoutes)

//! Server Setup
app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`)
})