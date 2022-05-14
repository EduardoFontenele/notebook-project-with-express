const express = require('express');
const route = express.Router();
const loginController = require('./src/controllers/loginController');
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController')

route
    .route('/')
    .get(homeController.index)

route
    .route('/login')
    .get(loginController.index);

route
    .route('/login/register')
    .post(loginController.register);

route
    .route('/login/login')
    .post(loginController.login)

route.get('/logout', loginController.logout)

route
    .route('/contato')
    .get(contatoController.index)
    .post(contatoController.register)

route.get('/contato/:id', contatoController.edit)

module.exports = route;