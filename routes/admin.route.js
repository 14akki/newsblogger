const express = require('express');

const admin_router = express();


//bodyparser, multer, ejs

const bodyParser = require('body-parser');
admin_router.use(bodyParser.json());
admin_router.use(bodyParser.urlencoded({ extended: true }));

admin_router.set('view engine', 'ejs');
admin_router.set('views', './views');

const multer = require('multer');
const path = require('path');
admin_router.use(express.static('public'));

const session = require('express-session');
const sessionSecretKey = process.env.SESSION_SECRET_KEY;

// Middleware: Body parsing 
admin_router.use(express.urlencoded({ extended: true }));
admin_router.use(express.json());


// Session middleware - should be loaded before routes 
admin_router.use(session({
    secret: sessionSecretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS 
}));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name)
    }
})
const upload = multer({ storage: storage })


//routes

const adminController = require('../controller/admin.controller');
const adminLoginAuth = require('../middleware/adminLoginAuth');

admin_router.get('/blog-setup', adminController.blogSetup);
admin_router.post('/blog-setup', upload.single('blog_logo'), adminController.blogSetupSave)
admin_router.get('/')
admin_router.get('/dashboard', adminLoginAuth.isLogin, adminController.dashboard);
admin_router.get('/create-post', adminLoginAuth.isLogin, adminController.loadPostdashboard)
admin_router.post('/create-post', adminLoginAuth.isLogin, adminController.addPost);

module.exports = admin_router;