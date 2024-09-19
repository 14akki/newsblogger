const blogSchema = require('../model/blog.schema');

const blogController = async (req, res) => {
    res.send('1st controller')
}

module.exports = {
    blogController,
}