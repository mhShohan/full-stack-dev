/**
 * Server startup script
 * Responsible for initializing and starting the HTTP server
 */

import { createApp } from './app';
import config from './config/app.config';

/**
 * Start the Express server
 */
function startServer(): void {
  const app = createApp();

  // Handle graceful shutdown
  const gracefulShutdown = (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);

    // Close server connections
    server.close(() => {
      console.log('Server closed. Process terminating...');
      process.exit(0);
    });

    // Force close if graceful shutdown fails
    setTimeout(() => {
      console.error('Could not close connections in time. Forcefully shutting down');
      process.exit(1);
    }, 5000);
  };

  // Start server
  const server = app.listen(config.port, () => {
    console.log('\n--- CPU-Intensive Task API Server ---');
    console.log(`Server running on port ${config.port}`);
    console.log(`Using ${config.workerThreads} worker threads for parallel computations`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('Press Ctrl+C to stop\n');
  });

  // Set up signal handlers for graceful shutdown
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT EXCEPTION');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
}

// Start the server
startServer();
