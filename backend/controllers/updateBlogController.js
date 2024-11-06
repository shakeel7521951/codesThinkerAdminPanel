const BlogsSchema = require('../Schema/BlogsSchema');
const cloudinary = require("../CloudinaryConfig/CloudinaryConfig");

const updateBlog = async (req, res) => {
    try {
        const { _id } = req.params;
        const updateData = { ...req.body };

        const blogToUpdate = await BlogsSchema.findById(_id);
        if (!blogToUpdate) {
            return res.status(404).json({ message: "Blog not found" });
        }

        if (req.file) {
            if (blogToUpdate.blogImage) {
                const oldImagePath = blogToUpdate.blogImage;
                const oldPublicId = oldImagePath.split("/").slice(-2).join("/").split(".")[0];

                await cloudinary.uploader.destroy(oldPublicId, (error, result) => {
                    if (error) {
                        console.error("Error deleting old image from Cloudinary:", error);
                    }
                });
            }

            updateData.blogImage = req.file.path; 
        }

        const updatedBlog = await BlogsSchema.findByIdAndUpdate(_id, updateData, {
            new: true,
            runValidators: true
        });

        if (updatedBlog) {
            res.status(200).json({ message: "Blog updated successfully", updatedBlog });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

module.exports = updateBlog;
