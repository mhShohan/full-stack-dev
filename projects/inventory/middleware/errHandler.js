const errHandler = async (err, req, res, next) => {
    res.json({
        error: err
    });
};

module.exports = errHandler;