const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // is_admin: {
    //     type: String,
    //     required: true,
    // },
    is_admin: {
        type: Boolean,  // Changed to Boolean
        required: true,
    },
    token: {
        type: String,
        required: false
    }
});

const user = mongoose.model('user', userSchema);
module.exports = user;
