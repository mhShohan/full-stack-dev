const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category_id: { type: mongoose.Schema.ObjectId, required: true },
    brand_id: { type: mongoose.Schema.ObjectId, required: true },
    price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema);