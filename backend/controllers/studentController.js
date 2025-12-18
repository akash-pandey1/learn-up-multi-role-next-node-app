import Student from '../models/Student.js';
import User from '../models/User.js';

// @desc    Add a student (kid) - Parent only
// @route   POST /api/students
// @access  Private/Parent
export const addStudent = async (req, res) => {
  try {
    // Only parents can add students
    if (req.user.role !== 'parent') {
      return res.status(403).json({ message: 'Only parents can add students' });
    }

    const studentData = {
      ...req.body,
      parent: req.user._id,
    };

    const student = await Student.create(studentData);

    // Add student to parent's kids array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { kids: student._id },
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all students for a parent
// @route   GET /api/students
// @access  Private/Parent
export const getStudents = async (req, res) => {
  try {
    let students;

    if (req.user.role === 'parent') {
      // Parents can only see their own kids
      students = await Student.find({ parent: req.user._id });
    } else if (req.user.role === 'admin') {
      // Admins can see all students
      students = await Student.find().populate('parent', 'name email');
    } else {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('parent', 'name email');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if user has access
    if (req.user.role === 'parent' && student.parent._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this student' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private/Parent
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Only parent can update their own kids
    if (req.user.role !== 'parent' || student.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this student' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Parent
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Only parent can delete their own kids
    if (req.user.role !== 'parent' || student.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this student' });
    }

    // Remove from parent's kids array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { kids: student._id },
    });

    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: 'Student removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

