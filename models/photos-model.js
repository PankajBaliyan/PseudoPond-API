const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photoId: {
        type: Number,
        required: true,
    },
    photoTitle: {
        type: String,
        required: true,
    },
    photoDescription: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
    photoThumbnailUrl: {
        type: String,
        required: true,
    },
    photoAlbumId: {
        type: String,
        required: true,
    },
    photoDate: {
        type: Date,
        required: true,
    },
    photoAuthor: {
        type: String,
        required: true,
    },
    photoLikes: {
        type: Number,
        required: true,
    },
    photoComments: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
