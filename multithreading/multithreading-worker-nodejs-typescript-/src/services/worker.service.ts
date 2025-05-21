/**
 * Worker Service
 * Manages the creation and execution of worker threads
 */

import { Worker } from 'worker_threads';
import path from 'path';
import { WorkerData, WorkerResponse, WorkerResults } from '../types';
import config from '../config/app.config';

export class WorkerService {
  private readonly threadCount: number;
  private readonly workloadSize: number;

  constructor(threadCount = config.workerThreads, workloadSize = config.workloadSize) {
    this.threadCount = threadCount;
    this.workloadSize = workloadSize;
  }

  /**
   * Creates a single worker thread
   * @param threadId - Identifier for the worker thread
   * @returns Promise that resolves with the worker result
   */
  private createWorker(threadId: number): Promise<WorkerResponse> {
    return new Promise((resolve, reject) => {
      // Create worker with typed data
      const workerData: WorkerData = {
        threadId,
        threadCount: this.threadCount,
        workloadSize: this.workloadSize,
      };

      const workerPath = path.resolve(__dirname, '../workers/computation.worker.ts');
      const worker = new Worker(workerPath, { workerData });

      // Set up event handlers
      worker.on('message', (data: WorkerResponse) => {
        resolve(data);
      });

      worker.on('error', (error) => {
        console.error(`[Worker ${threadId}] Error:`, error);
        reject(error);
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          const error = new Error(`Worker ${threadId} stopped with exit code ${code}`);
          console.error(error.message);
          reject(error);
        }
      });
    });
  }

  /**
   * Executes a CPU-intensive operation using a single worker thread
   * @returns Promise that resolves with the worker result
   */
  public async executeSingleWorker(): Promise<WorkerResponse> {
    console.log('[WorkerService] Starting single worker execution');
    return this.createWorker(0);
  }

  /**
   * Executes a CPU-intensive operation distributed across multiple worker threads
   * @returns Promise that resolves with combined results from all workers
   */
  public async executeMultipleWorkers(): Promise<WorkerResults> {
    console.log(`[WorkerService] Starting execution with ${this.threadCount} workers`);
    const startTime = performance.now();

    // Create the specified number of worker threads
    const workerPromises: Promise<WorkerResponse>[] = [];

    for (let i = 0; i < this.threadCount; i++) {
      workerPromises.push(this.createWorker(i));
    }

    // Wait for all workers to complete
    const threadResults = await Promise.all(workerPromises);

    // Calculate total and duration
    const total = threadResults.reduce((acc, curr) => acc + curr.count, 0);
    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`[WorkerService] All workers completed in ${duration.toFixed(2)}ms`);

    return {
      total,
      threads: threadResults,
      duration,
    };
  }
}
