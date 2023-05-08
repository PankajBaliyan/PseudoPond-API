const express = require('express'),
    mongoose = require('mongoose'),
    User = require('./models/users-model')
const app = express();
const casual = require('casual');
const axios = require('axios');


//! DotEnv Configure & Environment Variables
require('dotenv').config();
const PORT = process.env.PORT
const URI = process.env.DATABASE_URI

//! DataBase Setup
mongoose.connect(URI)
    .then(() => {
        console.log("Connected to MongoDB database")
        // createUsers(); // run only once, when data is inserted

    }).catch((error) => {
        console.log("Error connecting to MongoDB database", error)
    })

//! Function to insert temp data into DataBase
// make a route of this seperate route
// async function createUsers() {
//     const users = [];
//     // increase 5 to 500 later
//     for (let i = 0; i < 5; i++) {
//         const response = await axios.get('https://picsum.photos/200'),
//             firstName = casual.first_name,
//             lastName = casual.last_name,
//             fullName = `${firstName} ${lastName}`,
//             userName = casual.username,
//             email = casual.email,
//             password = casual.password,
//             profilePic = response.request.res.responseUrl,
//             phone = casual.phone,
//             website = casual.url,
//             companyName = casual.company_name,
//             area = casual.country,
//             city = casual.city,
//             state = casual.state,
//             country = casual.country,
//             zipCode = casual.zip(5),
//             latitude = casual.latitude,
//             longitude = casual.longitude;

//         const user = {
//             userID: i + 1,
//             userName: userName,
//             fname: firstName,
//             lname: lastName,
//             fullName: fullName,
//             profilePic: profilePic,
//             phone: phone,
//             website: website,
//             email: email,
//             companyName: companyName,
//             password: password,
//             address: {
//                 area: area,
//                 city: city,
//                 state: state,
//                 country: country,
//                 zipCode: zipCode,
//                 geolocation: {
//                     latitude: latitude,
//                     longitude: longitude,
//                 },
//             },
//             createdAt: new Date(),
//         };

//         users.push(user);
//     }
//     users.sort((a, b) => a.userID - b.userID); // Sort the users array by userId


//     // loop through the array of users and use the create method to add each user to the database
//     try {
//         await User.insertMany(users);
//         console.log('Users added successfully to the database');
//     } catch (err) {
//         console.error('Error adding users to the database', err);
//     }
// }

//! Home route
app.get('/', (req, res) => {
    res.send("Hey user, Welcome to PseudoPond API")
})

//! Routes Setup
const usersRoute = require('./routes/users-routes');
app.use(usersRoute)

//! Server Setup
app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`)
})
