const { ObjectId } = require('mongodb');
const customError = require('../utils/error');

const convertToId = (id) => {
    if (!ObjectId.isValid(id)) throw customError('Invalid Id!', 400);
    return ObjectId(id);
};

module.exports = { convertToId };