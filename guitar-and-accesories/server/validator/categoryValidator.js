const customError = require('../utils/error');

const categoryValidator = {
    stringValidator: (title) => {
        if (typeof title === 'boolean' || typeof title === null || typeof title === 'undefined' || typeof title === 'number') throw customError('Invalid Category Name!', 400);
        if (!title || title.length <= 2) {
            throw customError('Name must have 3 or more characters!', 400);
        } else {
            return title;
        }
    }
};

module.exports = categoryValidator;