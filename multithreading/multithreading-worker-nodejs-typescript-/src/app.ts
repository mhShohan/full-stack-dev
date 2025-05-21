/**
 * Main application entry point
 * Sets up the Express server with middleware and routes
 */

import express, { Express } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import apiRoutes from './routes/api.routes';
import { errorHandler } from './middleware/error.middleware';
import config from './config/app.config';

export function createApp(): Express {
  const app = express();

  // Security middleware
  app.use(helmet());

  // Response compression
  app.use(compression());

  // Request logging
  app.use(morgan('combined'));

  // JSON body parsing
  app.use(express.json());

  // API routes
  app.use('/api', apiRoutes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: `Route ${req.path} not found`,
    });
  });

  // Global error handler
  app.use(errorHandler);

  return app;
}

// Only start the server if this file is run directly (not imported)
if (require.main === module) {
  const app = createApp();

  app.listen(config.port, () => {
    console.log(
      `Server started on port ${config.port} with ${config.workerThreads} worker threads\n` +
        `Open http://localhost:${config.port}/api/health to test the server`
    );
  });
}
