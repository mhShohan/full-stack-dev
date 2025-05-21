/**
 * API Routes
 * Defines all API routes for the application
 */

import { Router } from 'express';
import { ComputationController } from '../controllers/computation.controller';

const router: Router = Router();
const computationController = new ComputationController();

// Health check endpoint - non-blocking
router.get('/health', computationController.healthCheck);

// CPU-intensive computation endpoints
router.get('/compute/single', computationController.singleThreaded);
router.get('/compute/multi', computationController.multiThreaded);

export default router;
