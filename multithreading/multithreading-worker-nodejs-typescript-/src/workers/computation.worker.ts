/**
 * Worker thread implementation for CPU-intensive operations
 * Performs a simple counting operation to simulate CPU load
 */

import { parentPort, workerData } from 'worker_threads';
import { WorkerData, WorkerResponse } from '../types';

if (!parentPort) {
  throw new Error('Worker must be run as a worker thread');
}

// Type-check the incoming worker data
const typedWorkerData = workerData as WorkerData;
const { threadId, threadCount, workloadSize } = typedWorkerData;

// Each thread processes an equal share of the total workload
const itemsPerThread = Math.floor(workloadSize / threadCount);

console.log(
  `[Worker ${threadId}] Starting computation with ${itemsPerThread.toLocaleString()} iterations`
);

const startTime = performance.now();
let counter = 0;

// Perform CPU-intensive work (simple counting)
for (let i = 0; i < itemsPerThread; i++) {
  counter++;
}

const endTime = performance.now();
const duration = endTime - startTime;

// Send results back to the main thread
const response: WorkerResponse = {
  threadId,
  count: counter,
  duration,
};

console.log(`[Worker ${threadId}] Completed in ${duration.toFixed(2)}ms`);
parentPort.postMessage(response);
