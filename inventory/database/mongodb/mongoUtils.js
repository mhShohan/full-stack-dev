const { ObjectId } = require("mongodb");

function isValidId(input) {
    return ObjectId.isValid(input);
}

function convertToId(input) {
    return ObjectId(input);
}

module.exports = {
    isValidId,
    convertToId
};