const express = require('express');

const admin_router = express();

const adminController = require('../controller/admin.controller');

admin_router.get('/testblog', adminController.blogController)

admin_router.get('/')

module.exports = admin_router;