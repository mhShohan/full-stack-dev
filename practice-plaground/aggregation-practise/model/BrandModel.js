const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });


module.exports = mongoose.model('brand', brandSchema);