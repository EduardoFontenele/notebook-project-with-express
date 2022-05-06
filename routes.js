const express = require('express');
const route = express.Router();
const loginController = require('./src/controllers/loginController');

route
    .route('/')
    .get(loginController.index);

route
    .route('/register')
    .post(loginController.register);

module.exports = route;