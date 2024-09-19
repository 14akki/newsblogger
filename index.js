const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const adminRoute = require('./routes/admin.route')










// routes
app.use('/', adminRoute);

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
