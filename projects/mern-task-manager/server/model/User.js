const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    firstName: {
        type: String,
        minlength: [3, 'First Name must have 3 or more characters!'],
        required: [true, 'Must provide the First name!']
    },
    lastName: {
        type: String,
        minlength: [3, 'Last Name must have 3 or more characters!'],
        required: [true, 'Must provide the Last name!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Must provide an Email!'],
        validate: {
            validator: function (value) {
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            }, message: props => `Invalid Email!`
        }
    }, title: {
        type: String, default: ''
    },
    avatar: { type: String, default: 'http://localhost:4000/api/v1/user/avatar' },
    description: { type: String, default: '' },
    password: {
        type: String,
        required: [true, 'Must be provide a password!']
    }
}, { timestamps: true });


module.exports = model('user', userSchema);