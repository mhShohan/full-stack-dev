const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = {
    generateToken: (body) => {
        return jwt.sign(body, process.env.JWT, { expiresIn: '1d' });
    },
    isValidId: (id) => mongoose.Types.ObjectId.isValid(id)
};