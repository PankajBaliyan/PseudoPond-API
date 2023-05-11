const casual = require('casual');
const notifier = require('node-notifier')
const Comment = require('../models/comments-model');

//* Get all Comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

//* Get comment by id
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

//* function to get highest id & will store data after that
async function getNextCommentId() {
    try {
        const maxCommentIdDoc = await Comment.find().sort({ commentId: -1 }).limit(1);
        const nextCommentID = maxCommentIdDoc.length > 0 ? maxCommentIdDoc[0].commentId + 1 : 1;
        return nextCommentID;
    } catch (err) {
        console.error('Error getting the next Comment ID', err);
        return 1
    }
}

//* route to create fake date at single click
exports.createComment = async (req, res) => {
    const id = req.params.id
    try {
        const comments = [];
        let commentId = await getNextCommentId();
        for (let i = 0; i < id; i++) {
            const commentAuthor = casual.full_name;
            const commentAuthorEmail = casual.email;
            const commentContent = casual.sentences(2);
            const commentDate = casual.date('YYYY-MM-DD');
            const commentLikes = casual.integer(10, 100);
            const commentReplies = casual.integer(10, 100);
            const postId = casual.uuid;
            const createdAt = new Date();

            const comment = {
                commentId,
                commentAuthor,
                commentAuthorEmail,
                commentContent,
                commentDate,
                commentLikes,
                commentReplies,
                postId,
                createdAt,
            };

            comments.push(comment);
            commentId = commentId + 1
        }
        comments.sort((a, b) => a.commentId - b.commentId); // Sort the Comments array by commentId

        // loop through the array of Comments and use the create method to add each comment to the database
        try {
            await Comment.insertMany(comments);
            console.log('Comments added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Comments Added Successfully!'
            });
            res.send('Comments added successfully to the database')
        } catch (err) {
            console.error('Error adding Comments to the database', err);
            res.send('Error creating Comments DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
};

exports.updateComment = async (req, res) => {
    // try {
    //     const comment = await Comment.findById(req.params.commentId);
    //     if (!comment) {
    //         return res.status(404).json({ message: 'Comment not found' });
    //     }
    //     const {
    //         commentAuthor,
    //         commentAuthorEmail,
    //         commentContent,
    //         commentDate,
    //         commentLikes,
    //         commentReplies,
    //         postId,
    //         createdAt
    //     } = req.body;
    //     comment.commentAuthor = commentAuthor;
    //     comment.commentAuthorEmail = commentAuthorEmail;
    //     comment.commentContent = commentContent;
    //     comment.commentDate = commentDate;
    //     comment.commentLikes = commentLikes;
    //     comment.commentReplies = commentReplies;
    //     comment.postId = postId;
    //     comment.createdAt = createdAt;
    //     const updatedComment = await comment.save();
    //     res.json(updatedComment);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: 'Server Error' });
    // }
};

exports.deleteComment = async (req, res) => {
    // try {
    //     const comment = await Comment.findById(req.params.commentId);
    //     if (!comment) {
    //         return res.status(404).json({ message: 'Comment not found' });
    //     }
    //     await comment.remove();
    //     res.json({ message: 'Comment deleted successfully' });
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: 'Server Error' });
    // }
};
