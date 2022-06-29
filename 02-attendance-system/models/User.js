const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minlength: [3, 'Name is to Short!'],
        maxlength: [30, 'Name is to Long!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        validate: {
            validator: function (value) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            },
            message: (props) => `Invalid Email: ${props.value}`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [6, 'password is to Short!'],
    },
    roles: {
        type: [String],
        required: true,
        default: ['STUDENT']
    },
    accountStatus: {
        type: String,
        required: true,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING'
    }
});


module.exports = model('User', userSchema);