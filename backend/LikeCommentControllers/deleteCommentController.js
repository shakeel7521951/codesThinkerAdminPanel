const BlogsSchema = require("../Schema/BlogsSchema")

const deleteComment = async (req, res) => {
    try {
        const { _id, commentId } = req.params;
        const updatedBlog = await BlogsSchema.findByIdAndUpdate(_id,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );
        if (updatedBlog) {
            res.status(200).json({ message: "Comment deleted successfully" });
        } else {
            res.status(404).json({ message: "Comment not found" });
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports = deleteComment;