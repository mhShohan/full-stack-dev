const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.ObjectId, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true }
}, { timestamps: true });


module.exports = mongoose.model('review', reviewSchema);