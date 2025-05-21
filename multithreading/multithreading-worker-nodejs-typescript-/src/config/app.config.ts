/**
 * Application configuration
 * Contains environment-specific settings for the application
 */

export interface AppConfig {
  port: number;
  workerThreads: number;
  workloadSize: number;
}

const config: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  workerThreads: parseInt(
    process.env.WORKER_THREADS || String(Math.max(1, require('os').cpus().length - 1))
  ),
  workloadSize: 20_000_000_000,
};

export default config;
