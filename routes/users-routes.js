const express = require('express');
const User = require('../models/users-model');
const router = express()

router.get('/users', async (req, res) => {
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
})

module.exports = router