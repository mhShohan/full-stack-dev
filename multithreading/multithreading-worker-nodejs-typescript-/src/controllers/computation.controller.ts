/**
 * Computation Controller
 * Handles API routes related to computation operations
 */

import { Request, Response } from 'express';
import { WorkerService } from '../services/worker.service';

export class ComputationController {
  private workerService: WorkerService;

  constructor() {
    this.workerService = new WorkerService();
  }

  /**
   * Simple non-blocking endpoint to test server responsiveness
   */
  public healthCheck = (_req: Request, res: Response): void => {
    res.status(200).json({
      status: 'ok',
      message: 'Server is running and responsive',
      timestamp: new Date().toISOString(),
    });
  };

  /**
   * Single-threaded blocking computation endpoint
   * Demonstrates performance without parallelization
   */
  public singleThreaded = async (_req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.workerService.executeSingleWorker();

      res.status(200).json({
        status: 'completed',
        threadId: result.threadId,
        count: result.count,
        duration: `${result.duration.toFixed(2)}ms`,
      });
    } catch (error) {
      console.error('[ComputationController] Error in singleThreaded:', error);
      res.status(500).json({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };

  /**
   * Multi-threaded computation endpoint
   * Demonstrates performance improvement with parallel execution
   */
  public multiThreaded = async (_req: Request, res: Response): Promise<void> => {
    try {
      const results = await this.workerService.executeMultipleWorkers();

      res.status(200).json({
        status: 'completed',
        total: results.total,
        threadCount: results.threads.length,
        duration: `${results.duration.toFixed(2)}ms`,
        threads: results.threads.map((thread) => ({
          threadId: thread.threadId,
          count: thread.count,
          duration: `${thread.duration.toFixed(2)}ms`,
        })),
      });
    } catch (error) {
      console.error('[ComputationController] Error in multiThreaded:', error);
      res.status(500).json({
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  };
}
