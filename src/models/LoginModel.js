const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    email: {required: true, type: 'string'}
})