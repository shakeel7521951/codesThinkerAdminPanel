const BlogsSchema = require("../Schema/BlogsSchema")

const commentBlog = async (req, res) => {
    try {
        const { _id } = req.params;
        const { user, comment } = req.body;

        const updatedBlog = await BlogsSchema.findByIdAndUpdate(
            _id,
            { $push: { comments: { user, comment } } },
            { new: true }
        );

        if (updatedBlog) {
            res.status(200).json({ message: "Comment added successfully", updatedBlog });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

module.exports = commentBlog