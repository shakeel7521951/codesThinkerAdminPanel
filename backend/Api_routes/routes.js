const express = require('express');
const pushDataController = require('../controllers/PushDataController');
const GetBlogsData = require('../controllers/GetBlogsController');
const deleteBlog = require('../controllers/deleteBlogController');
const updateBlog = require('../controllers/updateBlogController');

const multer = require('multer');
const likeBlog = require('../LikeCommentControllers/likeBlogController');
const commentBlog = require('../LikeCommentControllers/commentBlogController');
const deleteComment = require('../LikeCommentControllers/deleteCommentController');
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../CloudinaryConfig/CloudinaryConfig");

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary, 
    params: {
        folder: "blogImage",
        allowed_formats: ['jpg', 'jpeg', 'png'],
        public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
    }
});

const blogImages = multer({ storage });

router.get('/', (req, res) => {
    res.send("Codes thinker");
});

router.post('/pushBlog', blogImages.single('blogImage'), pushDataController);
router.get('/getBlogs/:_id?', GetBlogsData);
router.delete('/deleteBlog/:_id', deleteBlog);
router.put('/updateBlog/:_id', blogImages.single('blogImage'), updateBlog);

router.put("/blogs/:_id/like", likeBlog);
router.put("/blogs/:_id/comment", commentBlog);
router.put("/blogs/:_id/comment/:commentId", deleteComment);

module.exports = router;
