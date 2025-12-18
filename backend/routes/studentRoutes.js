import express from 'express';
import {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Parents can add students, admins can do everything
router.post('/', authorize('parent', 'admin'), addStudent);
router.get('/', authorize('parent', 'admin'), getStudents);
router.get('/:id', getStudentById);
router.put('/:id', authorize('parent', 'admin'), updateStudent);
router.delete('/:id', authorize('parent', 'admin'), deleteStudent);

export default router;

