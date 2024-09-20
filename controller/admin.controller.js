const blogSchema = require('../model/blog.schema');
const User = require('../model/user.schema');
const bcrypt = require('bcrypt');

const blogSetup = async (req, res) => {
    try {
        const blogs = await blogSchema.find({});
        if (blogs.length > 0) {
            res.redirect('/login');
        } else {
            res.render('blogSetup');
        }
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    blogSetup,
}