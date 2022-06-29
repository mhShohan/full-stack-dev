const customError = (message = 'Something wrong', status = 500) => {
    const error = new Error(message);
    error.status = status;

    return error;
};


module.exports = customError;