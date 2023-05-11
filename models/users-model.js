const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true,
    },
    userFname: {
        type: String,
        required: true
    },
    userLname: {
        type: String,
        required: true
    },
    userFullName: {
        type: String,
        required: true,
        default: function () {
            return this.fname + ' ' + this.lname;
        }
    },
    userName: {
        type: String,
        required: [true, 'You need to pass a username'],
        unique: true,
        trim: true
    },
    userProfilePic: {
        type: String,
        required: true,
    },
    userUserPhone: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userWebsite: {
        type: String,
        required: true,
    },
    userCompanyName: {
        type: String,
        required: true,
    },
    userAddress: {
        area: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zipCode: {
            type: Number,
            required: true
        },
        geolocation: {
            latitude: {
                type: String,
                required: true
            },
            longitude: {
                type: String,
                required: true
            }
        }
    },
    userAge: {
        type: Number,
        required: true
    },
    userGender: {
        type: String,
        required: true
    },
    userCreatedAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('User', usersSchema)