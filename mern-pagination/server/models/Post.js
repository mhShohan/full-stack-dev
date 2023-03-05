const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is Required!'] },
    author: { type: String, required: [true, 'author is Required!'] },
    body: { type: String, required: [true, 'body is Required!'] }
});

module.exports = mongoose.model('post', postSchema);