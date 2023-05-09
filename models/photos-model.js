const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photoId: {
        type: Number,
        required: true
    },
    photoTitle: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    photoThumbnailUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('photo', photoSchema)