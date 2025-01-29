function error(message = 'Something Went Wrong', status = 500, type = '') {
    const err = new Error(message);
    err.status = status;
    err.type = type;

    return err;
}


module.exports = error;