const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commentId: {
        type: Number,
        required: true
    },
    commentAuthor: {
        type: String,
        required: true
    },
    commentAuthorEmail: {
        type: String,
        required: true
    },
    commentContent: {
        type: String,
        required: true
    },
    commentDate: {
        type: Date,
        required: true
    },
    commentLikes: {
        type: Number,
        required: true
    },
    commentReplies: {
        type: Number,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
