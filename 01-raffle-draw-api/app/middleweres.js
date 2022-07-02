const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const middlewere = [morgan('dev'), cors(), express.json()]

module.exports = middlewere