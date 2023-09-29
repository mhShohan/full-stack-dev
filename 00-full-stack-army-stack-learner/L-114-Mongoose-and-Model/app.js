const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const OpenApiValidator = require('express-openapi-validator');
const mongoose = require('mongoose');
const { seedUser } = require('./seed');


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

app.use((req, _res, next) => {
    req.user = {
        id: 9999,
        name: 'mh'
    };
    next();
});

// health route
app.get('/health', (_req, res) => {
    return res.status(200).json({ status: 'OK' });
});

// routes 
app.use('/api/v1', require('./routes'));


// error handler middleware
app.use((err, _req, res, _next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

// env variables
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

// database connection and  server listening
mongoose.connect(MONGO_URI).then(() => {
    console.log('Database Connected!');
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
        // seedUser();
    });
}).catch(e => {
    console.log('Database connection Failed!');
    console.log(e.message);
});
