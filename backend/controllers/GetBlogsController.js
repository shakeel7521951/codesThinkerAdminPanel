const BlogsSchema = require('../Schema/BlogsSchema');

const GetBlogsData = async (req, res) => {
  try {
    const _id = req.params._id;
    if (_id) {
      const blog = await BlogsSchema.findById(_id);
      if (blog) {
        res.status(200).json({ message: "Blog found successfully", blog });
      } else {
        res.status(404).json({ message: "Blog not found" });
      }
    } else {
      const data = await BlogsSchema.find();
      if (data.length > 0) {
        res.status(200).json({ message: "Data Retrieved Successfully", data });
      } else {
        res.status(404).json({ message: "No blog item found!" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};

module.exports = GetBlogsData;
