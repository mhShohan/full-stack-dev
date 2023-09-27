const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const OpenApiValidator = require('express-openapi-validator');

// express APP
const app = express();

// middlewares
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(YAML.load('./swagger.yaml')));
app.use(
    OpenApiValidator.middleware({
        apiSpec: './swagger.yaml',
    }),
);

// health route
app.get('/health', (_req, res) => {
    return res.status(200).json({ status: 'OK' });
});

// routes
app.use('/api/v1', require('./routes'));

// env variables
const PORT = process.env.PORT || 4000;

// error handler middleware
app.use((err, _req, res, _next) => {
    // format error
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

// server listening
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));