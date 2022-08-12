const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    userEmail: { type: String, required: true },
    title: {
        type: String,
        required: [true, 'Must Provide a title!']
    },
    description: { type: String, default: '' },
    status: {
        type: String,
        required: true,
        enum: ['INPROGRESS', 'COMPLETED', 'CANCELLED'],
        default: 'INPROGRESS'
    }
}, { timestamps: true });

module.exports = model('task', taskSchema);