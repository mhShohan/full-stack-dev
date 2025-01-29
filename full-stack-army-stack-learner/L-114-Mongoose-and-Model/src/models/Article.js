const { model, Schema } = require('mongoose');

const articleSchema = new Schema({
    title: String,
    body: String,
    cover: String,
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED',],
        default: 'DRAFT'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true });

const User = model('article', articleSchema);
module.exports = User

