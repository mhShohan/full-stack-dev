/**
 * Common types used throughout the application
 */

/**
 * Worker Data passed to worker threads
 */
export interface WorkerData {
  threadId: number;
  threadCount: number;
  workloadSize: number;
}

/**
 * Worker Response returned from worker threads
 */
export interface WorkerResponse {
  threadId: number;
  count: number;
  duration: number;
}

/**
 * Combined results from all worker threads
 */
export interface WorkerResults {
  total: number;
  threads: WorkerResponse[];
  duration: number;
}
