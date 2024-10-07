const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    comments: {
        type: String,
        default: {}
    }
    // comments: [
    //     {
    //         username: {
    //             type: String,
    //             required: true
    //         },
    //         comment: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
});

const post = mongoose.model('Post', postSchema);
module.exports = post;