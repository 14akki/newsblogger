const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blog_title: { 
        type: String,
        required: true,
    },
    blog_description: {
        type: String,
        required: true,
    },
    blog_logo: {  
        type: String,
        required: true,
    }
});

const blog = mongoose.model('blog',blogSchema);
module.exports = blog;