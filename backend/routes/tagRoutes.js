import express from 'express';
import {
  getTags,
  getTagsByCategory,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from '../controllers/tagController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getTags);
router.get('/category/:categoryId', getTagsByCategory);
router.get('/:id', getTagById);

// Protected routes - Admin only
router.post('/', protect, authorize('admin'), createTag);
router.put('/:id', protect, authorize('admin'), updateTag);
router.delete('/:id', protect, authorize('admin'), deleteTag);

export default router;

