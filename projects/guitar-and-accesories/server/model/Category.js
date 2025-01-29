const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Must have a title of Category!'],
        minlength: [3, 'Category must be 3 or more Characters!'],
    }
}, { timestamps: true });


module.exports = mongoose.model('category', categorySchema);