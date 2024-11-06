const BlogsSchema = require("../Schema/BlogsSchema");

const likeBlog = async (req, res) => {
    try {
        const { _id } = req.params;
        const updatedBlog = await BlogsSchema.findByIdAndUpdate(_id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (updatedBlog) {
            res.status(200).json({ message: "Blog updated successfully" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({message:`Internal server error ${error.message}`});
    }
}

module.exports = likeBlog;