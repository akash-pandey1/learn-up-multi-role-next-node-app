import express from 'express';
import {
  getTutorProfile,
  getMyTutorProfile,
  updateTutorProfile,
  getTutorProfiles,
} from '../controllers/tutorProfileController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getTutorProfiles);
router.get('/:id', getTutorProfile);

// Protected routes
router.get('/me/profile', protect, authorize('tutor'), getMyTutorProfile);
router.put('/:id', protect, authorize('tutor', 'admin'), updateTutorProfile);

export default router;

