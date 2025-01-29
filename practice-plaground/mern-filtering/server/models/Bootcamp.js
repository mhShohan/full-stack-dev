const mongoose = require('mongoose');

const bootCampSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is Required!'], unique: true },
    rating: { type: Number, required: [true, 'rating is required!'] },
    description: { type: String, required: [true, 'description is required!'] },
    price: { type: Number, required: [true, 'Price is required!'] }
}, { timestamps: true });


module.exports = mongoose.model('bootcamp', bootCampSchema);