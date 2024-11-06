const BlogsSchema = require('../Schema/BlogsSchema');
const cloudinary = require("../CloudinaryConfig/CloudinaryConfig");

const deleteBlog = async (req, res) => {
    try {
        const { _id } = req.params;

        const blogToDelete = await BlogsSchema.findById(_id);
        if (!blogToDelete) {
            return res.status(404).json({ message: "Blog not found" });
        }

        const imagePath = blogToDelete.blogImage;
        const publicId = imagePath.split('/').slice(-2).join('/').split('.')[0];
 

        const cloudinaryDelete = async (publicId) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.destroy(publicId, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
            });
        };

        await cloudinaryDelete(publicId);

        const deletedBlog = await BlogsSchema.findByIdAndDelete(_id);
        if (deletedBlog) {
            return res.status(200).json({ message: "Blog deleted successfully" });
        } else {
            return res.status(400).json({ message: "Error deleting blog" });
        }

    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

module.exports = deleteBlog;
