const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    },
    postAuthor: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        required: true
    },
    postLikes: {
        type: Number,
        required: true
    },
    postComments: {
        type: Number,
        required: true
    },
    postImageUrl: {
        type: String,
        required: true
    },
    postCategory: {
        type: String,
        enum: ['technology', 'sports', 'entertainment'],
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
