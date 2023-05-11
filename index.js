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
        console.log("Error connecting to MongoDB database <br>", error)
    })

//! Home route
app.get('/', (req, res) => {
    res.send("Hey user, Welcome to PseudoPond API")
})

//! Routes Setup
const employeesRoute = require('./routes/employees-routes'),
    eventsRoute = require('./routes/events-routes')
// usersRoute = require('./routes/users-routes'),
// todosRoute = require('./routes/todos-routes'),
// photosRoute = require('./routes/photos-routes'),
// postsRoute = require('./routes/posts-routes'),
// commentsRoute = require('./routes/comments-routes'),
// productsRoutes = require('./routes/products-routes'),
// ordersRoutes = require('./routes/orders-routes'),
// inventoryRoute = require('./routes/inventory-routes')

app.use(employeesRoute)
app.use(eventsRoute)
// app.use(usersRoute)
// app.use(todosRoute)
// app.use(photosRoute)
// app.use(postsRoute)
// app.use(commentsRoute)
// app.use(productsRoutes)
// app.use(ordersRoutes)
// app.use(inventoryRoute)

//! Server Setup
app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`)
})
