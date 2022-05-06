const express = require('express')
const app = express()
const routes = require('./routes')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()
const { checkCsrf, csrfMiddleware, middlewareGlobal } = require('./src/middlewares/globals')

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        app.emit('start')
    })
    .catch(err => console.log(err))

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.set('views', path.resolve(__dirname, 'src', 'views', 'pages'))
app.use(express.static(path.resolve(__dirname, 'public')))

app.on('start', () => {
    console.log('http:localhost:3000')
    app.listen(3000)
})

const MongoStore = require('express-session')
const session = MongoStore({
    secret: 'O rato roeu a roupa do rei de Roma',
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 30,
    }
})

const csrf = require('csurf')
const flash = require('connect-flash')

app.use(session)

app.use(csrf())

app.use(flash())
app.use(checkCsrf)
app.use(csrfMiddleware)
app.use(middlewareGlobal)
app.use(routes)