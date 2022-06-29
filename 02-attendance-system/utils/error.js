function error(message = 'Something Went Wrong', status = 500) {
    const err = new Error(message);
    err.status = status;

    return err;
}


module.exports = error;