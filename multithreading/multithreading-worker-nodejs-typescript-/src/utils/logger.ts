/**
 * Logger utility
 * Provides consistent logging throughout the application
 */

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
}

/**
 * Logger class for standardized application logging
 */
export class Logger {
  private context: string;
  private static readonly isProduction = process.env.NODE_ENV === 'production';

  constructor(context: string) {
    this.context = context;
  }

  /**
   * Log a debug message (only in development)
   */
  public debug(message: string, context?: Record<string, unknown>): void {
    if (!Logger.isProduction) {
      this.log(LogLevel.DEBUG, message, context);
    }
  }

  /**
   * Log an info message
   */
  public info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log a warning message
   */
  public warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log an error message
   */
  public error(message: string, error?: Error, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, {
      ...context,
      ...(error && {
        errorMessage: error.message,
        stack: error.stack,
      }),
    });
  }

  /**
   * Internal method to format and output log entries
   */
  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message: `[${this.context}] ${message}`,
      ...(context && { context }),
    };

    // In production, we might want to use a more sophisticated logging solution
    // For now, we'll use console methods based on level
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(JSON.stringify(entry));
        break;
      case LogLevel.INFO:
        console.info(JSON.stringify(entry));
        break;
      case LogLevel.WARN:
        console.warn(JSON.stringify(entry));
        break;
      case LogLevel.ERROR:
        console.error(JSON.stringify(entry));
        break;
    }
  }
}
