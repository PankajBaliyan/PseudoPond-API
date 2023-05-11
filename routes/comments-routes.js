const express = require('express');
const commentController = require('../controllers/comments-controllers');

const router = express.Router();

// Routes for '/comment'
router.get('/comments', commentController.getAllComments);
router.get('/comments/:id', commentController.getCommentById);
router.post('/comments/create/:id', commentController.createComment);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
