import express from 'express';
import {
  getBatchesByProgram,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
} from '../controllers/batchController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/program/:programId', getBatchesByProgram);
router.get('/:id', getBatchById);

// Protected routes - Tutor only
router.post('/', protect, authorize('tutor', 'admin'), createBatch);
router.put('/:id', protect, authorize('tutor', 'admin'), updateBatch);
router.delete('/:id', protect, authorize('tutor', 'admin'), deleteBatch);

export default router;

