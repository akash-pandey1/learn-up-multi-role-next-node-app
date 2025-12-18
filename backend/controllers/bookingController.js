import Booking from '../models/Booking.js';
import Batch from '../models/Batch.js';
import Student from '../models/Student.js';

// @desc    Create booking - Parent only
// @route   POST /api/bookings
// @access  Private/Parent
export const createBooking = async (req, res) => {
  try {
    if (req.user.role !== 'parent') {
      return res.status(403).json({ message: 'Only parents can create bookings' });
    }

    const { student: studentId, program: programId, batch: batchId, amount } = req.body;

    // Verify student belongs to parent
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (student.parent.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Student does not belong to you' });
    }

    // Check batch availability
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    if (batch.isFull()) {
      return res.status(400).json({ message: 'Batch is full' });
    }

    // Check if student is already enrolled in this batch
    const existingBooking = await Booking.findOne({
      student: studentId,
      batch: batchId,
      status: { $in: ['pending', 'confirmed', 'active'] },
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Student is already enrolled in this batch' });
    }

    // Create booking
    const booking = await Booking.create({
      parent: req.user._id,
      student: studentId,
      program: programId,
      batch: batchId,
      amount,
      status: 'pending',
      paymentStatus: 'pending',
    });

    // Add student to batch enrollment
    batch.enrolledStudents.push({
      student: studentId,
      enrolledAt: new Date(),
    });
    batch.currentEnrollment += 1;
    await batch.save();

    // Add booking to student's bookings array
    student.bookings.push(booking._id);
    await student.save();

    const populatedBooking = await Booking.findById(booking._id)
      .populate('student')
      .populate('program')
      .populate('batch');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings - Parent sees their bookings, Tutor sees their program bookings
// @route   GET /api/bookings
// @access  Private
export const getBookings = async (req, res) => {
  try {
    let bookings;

    if (req.user.role === 'parent') {
      // Parents see their own bookings
      bookings = await Booking.find({ parent: req.user._id })
        .populate('student')
        .populate('program')
        .populate('batch')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'tutor') {
      // Tutors see bookings for their programs
      const Program = (await import('../models/Program.js')).default;
      const tutorPrograms = await Program.find({ tutor: req.user._id }).select('_id');
      const programIds = tutorPrograms.map((p) => p._id);

      bookings = await Booking.find({ program: { $in: programIds } })
        .populate('parent', 'name email')
        .populate('student')
        .populate('program')
        .populate('batch')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'admin') {
      // Admins see all bookings
      bookings = await Booking.find()
        .populate('parent', 'name email')
        .populate('student')
        .populate('program')
        .populate('batch')
        .sort({ createdAt: -1 });
    } else {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('parent', 'name email phone')
      .populate('student')
      .populate('program')
      .populate('batch');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check authorization
    if (req.user.role === 'parent' && booking.parent._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.user.role === 'tutor') {
      const Program = (await import('../models/Program.js')).default;
      const program = await Program.findById(booking.program._id);
      if (program.tutor.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status - For confirming, cancelling, etc.
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Parents can cancel their own bookings
    // Tutors can confirm/update bookings for their programs
    // Admins can do anything
    let canUpdate = false;

    if (req.user.role === 'admin') {
      canUpdate = true;
    } else if (req.user.role === 'parent' && booking.parent.toString() === req.user._id.toString()) {
      canUpdate = true;
    } else if (req.user.role === 'tutor') {
      const Program = (await import('../models/Program.js')).default;
      const program = await Program.findById(booking.program);
      if (program && program.tutor.toString() === req.user._id.toString()) {
        canUpdate = true;
      }
    }

    if (!canUpdate) {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    // If cancelling, update batch enrollment
    if (req.body.status === 'cancelled' && booking.status !== 'cancelled') {
      const batch = await Batch.findById(booking.batch);
      if (batch) {
        batch.enrolledStudents = batch.enrolledStudents.filter(
          (s) => s.student.toString() !== booking.student.toString()
        );
        batch.currentEnrollment = Math.max(0, batch.currentEnrollment - 1);
        await batch.save();
      }
      req.body.cancelledAt = new Date();
    }

    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('student')
      .populate('program')
      .populate('batch');

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

