const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts-controllers');

// GET all posts
router.get('/posts', postController.getAllPosts);

// GET a single post by ID
router.get('/posts/:id', postController.getPostById);

// POST a new post
router.post('/posts/create/:id', postController.createPost);

// PUT/Update an existing post by ID
router.put('/posts/:id', postController.updatePostById);

// DELETE a post by ID
router.delete('/posts/:id', postController.deletePostById);

module.exports = router;
