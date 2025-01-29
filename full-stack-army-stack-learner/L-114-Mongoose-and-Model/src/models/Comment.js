const { model, Schema } = require('mongoose');

const commentSchema = new Schema({
    body: String,
    status: {
        type: String,
        enum: ['PUBLIC', 'PRIVATE',],
        default: 'PUBLIC'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'article',
    }
}, { timestamps: true });

const User = model('comment', commentSchema);
module.exports = User

