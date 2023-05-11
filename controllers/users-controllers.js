const User = require('../models/users-model'),
    axios = require('axios'),
    casual = require('casual'),
    notifier = require('node-notifier')

//* Route to get all users data
const getAllUsers = async (req, res) => {
    try {
        // const users = await User.find({}); // for normal view
        // const users = await User.find().sort({ userID: 1 }); //for ascending order
        // const users = await User.find().sort({ userID: -1 }); //for descending order
        const users = await User.find().sort({ userID: 1 }).lean();
        users.forEach(user => {
            const { userID, userFname, userLname, userFullName, ...rest } = user;
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
const createUser = async (req, res) => {
    let id = req.params.id;
    try {
        const users = [];
        let userID = await getNextUserId();
        for (let i = 0; i < id; i++) {
            const response = await axios.get('https://picsum.photos/200')
            const userFname = casual.first_name;
            const userLname = casual.last_name;
            const userFullName = `${userFname} ${userLname}`;

            const user = {
                userID,
                userFname: userFname,
                userLname: userLname,
                userFullName: userFullName,
                userName: casual.username,
                userProfilePic: response.request.res.responseUrl,
                userUserPhone: casual.phone,
                userEmail: casual.email,
                userPassword: casual.password,
                userWebsite: casual.url,
                userCompanyName: casual.company_name,
                userAddress: {
                    area: casual.country,
                    city: casual.city,
                    state: casual.state,
                    country: casual.country,
                    zipCode: casual.zip(5),
                    geolocation: {
                        latitude: casual.latitude,
                        longitude: casual.longitude,
                    },
                },
                userAge: casual.integer(1, 100) || 1,
                userGender: casual.random_element(['Male', 'Female']),
                userCreatedAt: new Date(),
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

//* Route to get user by id
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
}

//* Route to update user by id
const updateUser = (req, res) => {
    // const { id } = req.params;

    // User.findByIdAndUpdate(id, req.body, { new: true })
    //     .then((user) => {
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         res.status(200).json(user);
    //     })
    //     .catch((error) => res.status(500).json({ error: error.message }));
};

//* Route to delete user by id
const deleteUser = (req, res) => {
    // const { id } = req.params;

    // User.findByIdAndRemove(id)
    //     .then((user) => {
    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         res.status(200).json({ message: 'User deleted successfully' });
    //     })
    //     .catch((error) => res.status(500).json({ error: error.message }));
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};