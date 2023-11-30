const express = require('express');
const applyMiddleware = require('./middleware');

// express APP
const app = express();
applyMiddleware(app);

// health route
app.get('/health', (_req, res) => {
    return res.status(200).json({ status: 'OK' });
});

// routes 
app.use('/api/v1', require('./routes'));

app.all('*', (_req, _res, next) => {
    const error = new Error('Resource not found!');
    error.code = 404;
    error.error = 'Not Found!';

    next(error);
});

// error handler middleware
app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});



module.exports = app;