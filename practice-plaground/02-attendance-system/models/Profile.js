const { Schema, model } = require('mongoose')

const profileModel = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})


module.exports = model('Profile', profileModel)