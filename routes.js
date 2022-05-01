const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')

route
    .route('/')
    .get(homeController.index)
    .post(homeController.handlePost)
module.exports = route