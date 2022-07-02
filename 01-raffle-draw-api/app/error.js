const handler = {}

handler.notFound = (_req, _res, next) => {
    const error = new Error('404! Not Found...')
    error.status = 404;
    next(error);
}

handler.errorHanlder = (error, _req, res, next) => {
    if (error.status) {
        return res.status(error.status).json({ message: error.message })
    }

    res.status(500).json({ message: 'Server Error!', error })
}

module.exports = handler