const mongoose = require('mongoose');


const companyNameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Must have a title of Company Name!'],
        minlength: [3, 'Company Name must be 3 or more Characters!']
    }
}, { timestamps: true });


module.exports = mongoose.model('company-name', companyNameSchema);