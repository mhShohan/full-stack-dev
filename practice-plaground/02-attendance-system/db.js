const mongoose = require('mongoose')

function connectDB(URI) {
    return mongoose.connect(URI)
}

module.exports = connectDB