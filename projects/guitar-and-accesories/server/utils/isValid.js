const mongoose = require('mongoose');

const isValid = {
    id: (id) => mongoose.Types.ObjectId.isValid(id)
};

module.exports = isValid;