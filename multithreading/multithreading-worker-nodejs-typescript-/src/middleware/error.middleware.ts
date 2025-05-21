/**
 * Error handling middleware
 * Catches and processes any errors that occur during request handling
 */

import { Request, Response, NextFunction } from 'express';

export interface ApiError extends Error {
  statusCode?: number;
  details?: unknown;
}

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Log error details for debugging
  console.error(`[ERROR] ${err.message}`, {
    path: req.path,
    method: req.method,
    error: err.stack,
    details: err.details,
  });

  // Set appropriate HTTP status code
  const statusCode = err.statusCode || 500;

  // Send error response
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'An unexpected error occurred',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    ...((err.details && { details: err.details }) as any),
  });
}
