const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

// express APP
const app = express();

// middlewares
app.use(express.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(YAML.load('./swagger.yaml')));

// health route
app.get('/health', (_req, res) => {
    return res.status(200).json({ status: 'OK' });
});

// env variables
const PORT = process.env.PORT || 4000;

// server listening
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));