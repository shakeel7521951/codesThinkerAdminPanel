const BlogsSchema = require('../Schema/BlogsSchema');

const pushDataController = async (req, res) => {
    try {
        const { title, author, category, date, description } = req.body;
        let blogImage = req.file.path

        if (!title || !author || !category || !date || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const pushBlogData = await BlogsSchema.create({
            title,
            author,
            category,
            date,
            description,
            blogImage
        });

        if (pushBlogData) {
            res.status(201).json({ message: 'Blog created successfully', data: pushBlogData });
        } else {
            res.status(400).json({ message: 'Failed to create blog' });
        }
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
};

module.exports = pushDataController;
