require('dotenv').config('../.env')
const express = require('express')
const { notFound, errorHanlder } = require('./error')


const app = express()

//middlewere
app.use(require('./middleweres'))
app.use(require('./route'))


//error handler
app.use(notFound)
app.use(errorHanlder)

module.exports = app;