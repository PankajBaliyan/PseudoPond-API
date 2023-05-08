const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true,
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    fullName: {
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
    profilePic: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    companyName: {
        type: String,
        required: true,
    },
    address: {
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
    }
})

module.exports = mongoose.model('User', usersSchema)