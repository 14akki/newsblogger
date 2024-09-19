const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    blog_title: { 
        type: String,
        required: true,
    },
    blog_description: {
        type: String,
        required: true,
    },
    blog_image: {  
        type: String,
        required: true,
    }
});

const blog = mongoose.model('blog',blogSchema);
module.exports = blog;