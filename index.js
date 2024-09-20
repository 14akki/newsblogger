const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

//requires-

const isBlogExist = require('./middleware/blogExist')

const adminRoute = require('./routes/admin.route')










// global mount-

app.use(isBlogExist.isBlogExistorNot);

app.use('/', adminRoute);




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
