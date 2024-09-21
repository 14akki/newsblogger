const blogSchema = require('../model/blog.schema');
const User = require('../model/user.schema');
const bcrypt = require('bcrypt');


const securePassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error.message)
    }
}


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

const blogSetupSave = async (req, res) => {
    try {
        console.log('File Info:', req.file);

        const blog_title = req.body.blog_title;
        const blog_image = req.file.filename;
        const blog_description = req.body.blog_description;
        const name = req.body.name;
        const email = req.body.email;
        const password = await securePassword(req.body.password);



        const newBlog = new blogSchema({
            blog_title: blog_title,
            blog_logo: blog_image,
            blog_description: blog_description,
        });

        const saveBlog = await newBlog.save();
        console.log('Blog saved:', saveBlog);

        const newUser = new User({
            name: name,
            email: email,
            password: password,
            is_admin: 1
        });

        const savedUser = await newUser.save();
        console.log('user saved', savedUser);

        if (savedUser) {
            res.redirect('/login');

        } else {
            res.render('blogSetup', { message: 'Blog setup hase some problem' });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}


const dashboard =  (req, res) => {
    try {
      res.render('admin/dashboard');
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    blogSetup,
    blogSetupSave,
    dashboard,
}