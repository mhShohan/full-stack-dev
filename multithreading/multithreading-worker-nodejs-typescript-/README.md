# Worker Threads API

A high-performance Node.js API that demonstrates the use of worker threads for CPU-intensive operations.

## Features

- **Multi-threading support**: Distributes CPU-intensive tasks across multiple worker threads for improved performance
- **TypeScript**: Full TypeScript support with strict type checking
- **Modern Node.js**: Uses Node.js worker threads API for true parallelism
- **RESTful API**: Well-structured Express API with proper error handling
- **Production-ready**: Includes security middleware, compression, logging, and graceful shutdown

## Architecture

```
src/
├── config/           # Application configuration
├── controllers/      # Request handlers
├── middleware/       # Express middleware
├── routes/           # API route definitions
├── services/         # Business logic
├── types/            # TypeScript type definitions
├── workers/          # Worker thread implementations
├── app.ts            # Express application setup
└── server.ts         # Server entry point
```

## API Endpoints

| Endpoint              | Method | Description                                       |
| --------------------- | ------ | ------------------------------------------------- |
| `/api/health`         | GET    | Health check endpoint (non-blocking)              |
| `/api/compute/single` | GET    | Execute computation using a single worker thread  |
| `/api/compute/multi`  | GET    | Execute computation using multiple worker threads |

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the TypeScript code:
   ```bash
   npm run build
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Development

Run the development server with hot reloading:

```bash
npm run dev
```

## Configuration

Configuration is stored in `src/config/app.config.ts` and can be overridden with environment variables:

- `PORT`: Server port (default: 3000)
- `WORKER_THREADS`: Number of worker threads to use (default: number of CPU cores - 1)
- `NODE_ENV`: Environment (development/production)

## Performance Comparison

Test the performance difference between single-threaded and multi-threaded execution:

1. Single-threaded: `GET /api/compute/single`
2. Multi-threaded: `GET /api/compute/multi`

Compare the execution times to see the performance improvement with parallel processing.

I'll create an industry-grade example based on your Node.js application that uses worker threads for CPU-intensive operations. I'll refactor the code, convert it to TypeScript, and provide proper documentation.

Let's analyze the current code first:

- You have an Express server with three endpoints:
  - `/non-blocking`: Returns immediately (demonstration endpoint)
  - `/blocking`: Uses a worker thread to perform a CPU-intensive calculation
  - `/blocking-optimized`: Uses multiple worker threads to distribute the calculation

Let me create an improved TypeScript version with better architecture, error handling, logging, configuration management, and documentation.

## Explanation of the Enhanced Worker Threads API

I've completely refactored your original Express application that used worker threads into a more robust, industry-grade TypeScript application. Here's a breakdown of the improvements:

### Key Improvements

1. **TypeScript Conversion**: The entire codebase is now using TypeScript with proper type definitions for better type safety and developer experience.

2. **Architecture Refactoring**:

   - Implemented a proper layered architecture (controllers, services, routes)
   - Separated concerns into distinct modules
   - Added proper error handling throughout the application

3. **Configuration Management**:

   - Created a centralized config module
   - Added environment variable support
   - Auto-detection of CPU cores for optimal thread count

4. **Advanced Worker Thread Management**:

   - Improved worker communication with typed interfaces
   - Better error handling for worker threads
   - Added performance metrics (execution duration)

5. **Industry Best Practices**:

   - Added security middleware (helmet)
   - Implemented compression for API responses
   - Added request logging
   - Implemented graceful shutdown

6. **Developer Experience**:
   - Comprehensive documentation
   - Consistent coding style
   - Clear project structure
   - npm scripts for common tasks

### How It Works

#### Worker Thread Architecture

1. **The Worker Service** (`src/services/worker.service.ts`):

   - Acts as a manager for creating and coordinating worker threads
   - Provides methods for both single-threaded and multi-threaded execution
   - Collects and aggregates results from multiple workers

2. **The Worker Implementation** (`src/workers/computation.worker.ts`):

   - Receives a portion of the workload based on the thread count
   - Performs the CPU-intensive operation (counting)
   - Measures execution time and reports results back to the main thread

3. **API Layer** (`src/controllers/computation.controller.ts`):
   - Provides RESTful endpoints to trigger computations
   - Handles errors and formats responses

### Performance Improvements

The application uses dynamic thread count configuration based on the available CPU cores. This allows it to scale efficiently on different hardware. Each worker processes an equal portion of the total workload, providing significant performance improvements over single-threaded execution.

For example, on an 8-core machine, you could expect the multi-threaded approach to be approximately 7x faster than the single-threaded version (using 7 worker threads).

### How to Use

1. **Start the Server**:

   ```bash
   npm run build
   npm start
   ```

2. **Test Different Endpoints**:

   - Non-blocking endpoint: `GET http://localhost:3000/api/health`
   - Single-threaded computation: `GET http://localhost:3000/api/compute/single`
   - Multi-threaded computation: `GET http://localhost:3000/api/compute/multi`

3. **Compare Performance**:
   The response includes detailed timing information so you can compare the execution times between single and multi-threaded approaches.

### Key Design Decisions

1. **Automatic Thread Count**: The application automatically determines the optimal number of worker threads based on available CPU cores (default is cores - 1, to leave one core for the main thread).

2. **Typed Communication**: All communication between the main thread and worker threads uses strongly typed interfaces.

3. **Graceful Shutdown**: The server implements proper signal handling for graceful shutdown, ensuring all resources are properly released.

4. **Comprehensive Error Handling**: Errors in worker threads are properly propagated to the main thread and handled appropriately.

5. **Performance Metrics**: Each operation measures and reports detailed timing information.

This implementation provides a solid foundation for building high-performance Node.js applications that need to handle CPU-intensive operations without blocking the event loop.

## License

MIT
