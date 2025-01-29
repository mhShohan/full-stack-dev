const { Schema, model } = require('mongoose');

const adminAttendanceSchema = new Schema({
    timeLimit: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 30,
        default: 5
    },
    status: {
        type: String,
        required: true,
        enum: ['RUNNING', 'COMPLETED'],
        default: 'RUNNING'
    },
}, { timestamps: true });

module.exports = model('AdminAttendance', adminAttendanceSchema);
