const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

//requires-

const isBlogExist = require('./middleware/blogExist')

const adminRoute = require('./routes/admin.route')

const userRoute = require('./routes/user.route');

const session = require('express-session');
const sessionSecretKey = process.env.SESSION_SECRET_KEY;

// Middleware: Body parsing 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
 
// Session middleware - should be loaded before routes 
app.use(session({ 
    secret: sessionSecretKey,
    resave: false, 
    saveUninitialized: true, 
    cookie: { secure: false }  // Set to true if using HTTPS 
}));







// global mount-

app.use(isBlogExist.isBlogExistorNot);

app.use('/', adminRoute);

app.use('/', userRoute);




//root route
app.get('/', (req, res) => {
    res.send("This is NEWSBLOGGER APP project");
});









// Mongoose connection
const databaseUrl = process.env.DATABASE_URL;
const dbName = 'newsbloggerAPP';

mongoose.connect(databaseUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB', dbName);
});

// Start the server
const PORTNo = process.env.PORT;
app.listen(PORTNo, () => {
    console.log(`Server started at PORT No ${PORTNo}`);
});
