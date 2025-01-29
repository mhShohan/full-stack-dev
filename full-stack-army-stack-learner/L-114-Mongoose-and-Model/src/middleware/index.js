const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const authenticate = require('./authenticate');

const applyMiddleware = (app) => {
  app.use(express.json());
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(YAML.load('./swagger.yaml')));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: './swagger.yaml',
    }),
  );
  app.use(authenticate);
};

module.exports = applyMiddleware;