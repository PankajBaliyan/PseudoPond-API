const casual = require('casual');
const notifier = require('node-notifier')
const Post = require('../models/posts-model');

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

//* function to get highest id & will store data after that
async function getNextPostId() {
    try {
        const maxPostIdDoc = await Post.find().sort({ postId: -1 }).limit(1);
        const nextPostID = maxPostIdDoc.length > 0 ? maxPostIdDoc[0].postId + 1 : 1;
        return nextPostID;
    } catch (err) {
        console.error('Error getting the next Post ID', err);
        return 1
    }
}

// Create a new post
exports.createPost = async (req, res) => {
    const id = req.params.id
    try {
        const posts = [];
        let postId = await getNextPostId();
        for (let i = 0; i < id; i++) {
            const postTitle = casual.title;
            const postContent = casual.text;
            const postAuthor = casual.full_name;
            const postDate = casual.date('YYYY-MM-DD');
            const postLikes = casual.integer(1, 100) || 1;
            const postComments = casual.integer(1, 100) || 1;
            const postImageUrl = `https://picsum.photos/id/${postId}/800/600`;
            const postCategory = casual.random_element(['technology', 'sports', 'entertainment']);

            const post = {
                postId,
                postTitle,
                postContent,
                postAuthor,
                postDate,
                postLikes,
                postComments,
                postImageUrl,
                postCategory,
                createdAt: new Date(),
            };

            posts.push(post);
            postId = postId + 1
        }
        posts.sort((a, b) => a.postId - b.postId); // Sort the posts array by postId

        // loop through the array of posts and use the create method to add each post to the database
        try {
            await Post.insertMany(posts);
            console.log('Posts added successfully to the database');
            notifier.notify({
                title: 'New Notification',
                message: 'Posts Added Successfully!'
            });
            res.send('Posts added successfully to the database')
        } catch (err) {
            console.error('Error adding Posts to the database', err);
            res.send('Error creating Posts DataBase')
        }
    } catch (error) {
        console.log("error", error)
    }
};

// Update an existing post by ID
exports.updatePostById = async (req, res) => {
    // const { postTitle, postContent, postAuthor, postDate, postLikes, postComments, postImageUrl, postCategory } = req.body;

    // try {
    //     let post = await Post.findById(req.params.postId);
    //     if (!post) {
    //         return res.status(404).json({ message: 'Post not found' });
    //     }
    //     post.postTitle = postTitle;
    //     post.postContent = postContent;
    //     post.postAuthor = postAuthor;
    //     post.postDate = postDate;
    //     post.postLikes = postLikes;
    //     post.postComments = postComments;
    //     post.postImageUrl = postImageUrl;
    //     post.postCategory = postCategory;

    //     await post.save();
    //     res.status(200).json(post);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: 'Server Error' });
    // }
};

// Delete a post by ID
exports.deletePostById = async (req, res) => {
    // try {
    //     const post = await Post.findByIdAndDelete(req.params.postId);
    //     if (!post) {
    //         return res.status(404).json({ message: 'Post not found' });
    //     }
    //     res.status(200).json({ message: 'Post deleted successfully' });
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: 'Server Error' });
    // }
};