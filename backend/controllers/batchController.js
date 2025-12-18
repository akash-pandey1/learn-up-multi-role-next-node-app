import Batch from '../models/Batch.js';
import Program from '../models/Program.js';

// @desc    Get all batches for a program
// @route   GET /api/batches/program/:programId
// @access  Public
export const getBatchesByProgram = async (req, res) => {
  try {
    const batches = await Batch.find({
      program: req.params.programId,
      status: { $in: ['upcoming', 'active'] },
    })
      .populate('enrolledStudents.student', 'firstName lastName')
      .sort({ startDate: 1 });

    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get batch by ID
// @route   GET /api/batches/:id
// @access  Public
export const getBatchById = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id)
      .populate('program')
      .populate('enrolledStudents.student', 'firstName lastName dateOfBirth');

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    res.json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create batch - Tutor only
// @route   POST /api/batches
// @access  Private/Tutor
export const createBatch = async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ message: 'Only tutors can create batches' });
    }

    const { program: programId } = req.body;

    // Verify program belongs to tutor
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    if (program.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to create batch for this program' });
    }

    const batch = await Batch.create(req.body);

    // Add batch to program
    await Program.findByIdAndUpdate(programId, {
      $push: { batches: batch._id },
    });

    res.status(201).json(batch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update batch - Tutor only
// @route   PUT /api/batches/:id
// @access  Private/Tutor
export const updateBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate('program');

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Only tutor who owns the program can update
    if (
      req.user.role !== 'admin' &&
      batch.program.tutor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to update this batch' });
    }

    const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedBatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete batch - Tutor only
// @route   DELETE /api/batches/:id
// @access  Private/Tutor
export const deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate('program');

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Only tutor who owns the program can delete
    if (
      req.user.role !== 'admin' &&
      batch.program.tutor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this batch' });
    }

    // Remove batch from program
    await Program.findByIdAndUpdate(batch.program._id, {
      $pull: { batches: batch._id },
    });

    await Batch.findByIdAndDelete(req.params.id);

    res.json({ message: 'Batch removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

