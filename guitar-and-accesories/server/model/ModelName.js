const mongoose = require('mongoose');


const modelNameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Must have a title of Model Name!'],
        minlength: [3, 'Model Name must be 3 or more Characters!']
    }
}, { timestamps: true });


module.exports = mongoose.model('category', modelNameSchema);