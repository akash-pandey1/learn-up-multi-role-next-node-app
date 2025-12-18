import express from 'express';
import {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramsByTutor,
  getRecommendedPrograms,
} from '../controllers/programController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPrograms);
router.get('/tutor/:tutorId', getProgramsByTutor);
router.get('/recommendations/:studentId', protect, getRecommendedPrograms);
router.get('/:id', getProgramById);

// Protected routes - Tutor only
router.post('/', protect, authorize('tutor', 'admin'), createProgram);
router.put('/:id', protect, authorize('tutor', 'admin'), updateProgram);
router.delete('/:id', protect, authorize('tutor', 'admin'), deleteProgram);

export default router;

