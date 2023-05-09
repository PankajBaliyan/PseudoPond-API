const User = require('../models/users-model'),
    axios = require('axios'),
    casual = require('casual'),
    notifier = require('node-notifier')

//* Route to get all users data
const getAllUsers = async (req, res) => {
    try {
        // const users = await User.find({});
        // const users = await User.find().sort({ userID: 1 }); //for ascending order
        // const users = await User.find().sort({ userID: -1 }); //for descending order
        const users = await User.find().sort({ userID: 1 }).lean();
        users.forEach(user => {
            const { userID, fname, lname, fullName, ...rest } = user;
            //   console.log({ userID, fname, lname, fullName, ...rest });
        });

        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

//* function to get last inserted id, & insert data after that id
async function getNextUserId() {
    try {
        const maxUserIdDoc = await User.find().sort({ userID: -1 }).limit(1);
        const nextUserId = maxUserIdDoc.length > 0 ? maxUserIdDoc[0].userID + 1 : 1;
        return nextUserId;
    } catch (err) {
        console.error('Error getting the next user ID', err);
        return 1
    }
}

//* Route to insert temp data into DataBase
const createFakeUsers = async (req, res) => {
    let id = req.params.id;
    try {
        const users = [];
        let userID = await getNextUserId();
        for (let i = 0; i < id; i++) {
            const response = await axios.get('https://picsum.photos/200'),
                firstName = casual.first_name,
                lastName = casual.last_name,
                fullName = `${firstName} ${lastName}`,
                userName = casual.username,
                email = casual.email,
                password = casual.password,
                profilePic = response.request.res.responseUrl,
                phone = casual.phone,
                website = casual.url,
                companyName = casual.company_name,
                area = casual.country,
                city = casual.city,
                state = casual.state,
                country = casual.country,
                zipCode = casual.zip(5),
                latitude = casual.latitude,
                longitude = casual.longitude;

            const user = {
                userID: userID,
                userName: userName,
                fname: firstName,
                lname: lastName,
                fullName: fullName,
                profilePic: profilePic,
                phone: phone,
                website: website,
                email: email,
                companyName: companyName,
                password: password,
                address: {
                    area: area,
                    city: city,
                    state: state,
                    country: country,
                    zipCode: zipCode,
                    geolocation: {
                        latitude: latitude,
                        longitude: longitude,
                    },
                },
                createdAt: new Date(),
            };

            users.push(user);
            userID = userID + 1
        }
        users.sort((a, b) => a.userID - b.userID); // Sort the users array by userId


        // loop through the array of users and use the create method to add each user to the database
        try {
            await User.insertMany(users);
            console.log('Users added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Users Added Successfully!'
            });
            res.send('Users added successfully to the database')
        } catch (err) {
            console.error('Error adding users to the database', err);
            res.send('Error creating users DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
}

module.exports = {
    getAllUsers,
    createFakeUsers
}