const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'DECLINED', 'BLOCKED'],
        default: 'PENDING'
    }
}, { timestamps: true });

const User = model('user', userSchema);

module.exports = User

