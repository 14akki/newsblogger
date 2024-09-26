const express = require('express');
const user_router = express();
require('dotenv').config();
// const session = require('express-session');
// const sessionSecretKey = process.env.SESSION_SECRET_KEY;

const userController = require('../controller/user.controller')
const adinLoginAuth = require('../middleware/adminLoginAuth');

// const bodyParser = require('body-parser');
// user_router.use(bodyParser.json())
// user_router.use(bodyParser.urlencoded({ extended: true }));

user_router.set('view engine', 'ejs');
user_router.set('views', './views');

// user_router.use(express.static('public'));
// user_router.use(session({
//     secret: sessionSecretKey,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true },
// }))



user_router.get('/login', adinLoginAuth.isLogout, userController.loginLoader);

user_router.post('/login', userController.verfiyLogin);

user_router.get('/logout', adinLoginAuth.isLogin , userController.logout);

user_router.get('/profile', userController.profile);

user_router.get('/forget-password', adinLoginAuth.isLogin, userController.forgetLoad);




module.exports = user_router;
