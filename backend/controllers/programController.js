import Program from '../models/Program.js';
import Batch from '../models/Batch.js';

// @desc    Get all programs with advanced filtering
// @route   GET /api/programs
// @access  Public
export const getPrograms = async (req, res) => {
  try {
    const {
      category,
      tags, // comma-separated tag IDs or single tag ID
      ageMin,
      ageMax,
      locationType,
      tutor,
      priceMin,
      priceMax,
      level,
      status = 'published',
      search,
      hasAvailability, // true/false - filter by batch availability
      sortBy = 'createdAt', // createdAt, price, rating, title
      sortOrder = 'desc', // asc, desc
      limit,
      page = 1,
    } = req.query;

    // Build query
    const query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (locationType) query.locationType = locationType;
    if (tutor) query.tutor = tutor;
    if (level) query.level = level;

    // Age range filtering
    if (ageMin) query.ageMax = { $gte: parseInt(ageMin) };
    if (ageMax) query.ageMin = { $lte: parseInt(ageMax) };

    // Price range filtering
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseFloat(priceMin);
      if (priceMax) query.price.$lte = parseFloat(priceMax);
    }

    // Tags filtering (multi-select support)
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(',');
      query.tags = { $in: tagArray };
    }

    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }

    // Build sort object
    const sort = {};
    if (sortBy === 'price') {
      sort.price = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'rating') {
      sort['rating.average'] = sortOrder === 'asc' ? 1 : -1;
    } else if (sortBy === 'title') {
      sort.title = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = sortOrder === 'asc' ? 1 : -1;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = limit ? parseInt(limit) : 20;
    const skip = (pageNum - 1) * limitNum;

    // Execute query with populate
    let programs = await Program.find(query)
      .populate('category', 'name slug icon')
      .populate('tags', 'name slug category')
      .populate('tutor', 'name email')
      .populate({
        path: 'batches',
        match: { status: { $in: ['upcoming', 'active'] } },
      })
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Filter by availability if requested
    if (hasAvailability === 'true') {
      programs = programs.filter((program) => {
        const availableBatches = program.batches.filter((batch) => {
          if (!batch || !batch._id) return false;
          return batch.status === 'upcoming' || batch.status === 'active';
        });
        return availableBatches.length > 0;
      });
    }

    // Get total count for pagination
    const total = await Program.countDocuments(query);

    res.json({
      programs,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get program by ID
// @route   GET /api/programs/:id
// @access  Public
export const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate('category', 'name slug icon description')
      .populate('tags', 'name slug category')
      .populate('tutor', 'name email')
      .populate({
        path: 'tutor',
        populate: {
          path: 'tutorProfile',
        },
      })
      .populate({
        path: 'batches',
        match: { status: { $in: ['upcoming', 'active'] } },
        populate: {
          path: 'enrolledStudents.student',
          select: 'firstName lastName',
        },
      });

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    res.json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create program - Tutor only
// @route   POST /api/programs
// @access  Private/Tutor
export const createProgram = async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ message: 'Only tutors can create programs' });
    }

    const programData = {
      ...req.body,
      tutor: req.user._id,
    };

    const program = await Program.create(programData);

    res.status(201).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update program - Tutor only (own programs)
// @route   PUT /api/programs/:id
// @access  Private/Tutor
export const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Only tutor who created it can update (or admin)
    if (
      req.user.role !== 'admin' &&
      (req.user.role !== 'tutor' || program.tutor.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ message: 'Not authorized to update this program' });
    }

    const updatedProgram = await Program.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedProgram);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete program - Tutor only (own programs)
// @route   DELETE /api/programs/:id
// @access  Private/Tutor
export const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);

    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Only tutor who created it can delete (or admin)
    if (
      req.user.role !== 'admin' &&
      (req.user.role !== 'tutor' || program.tutor.toString() !== req.user._id.toString())
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this program' });
    }

    // Also delete associated batches
    await Batch.deleteMany({ program: program._id });

    await Program.findByIdAndDelete(req.params.id);

    res.json({ message: 'Program removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get programs by tutor
// @route   GET /api/programs/tutor/:tutorId
// @access  Public
export const getProgramsByTutor = async (req, res) => {
  try {
    const programs = await Program.find({ tutor: req.params.tutorId })
      .populate('category', 'name slug icon')
      .populate('tags', 'name slug')
      .populate('batches')
      .sort({ createdAt: -1 });

    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recommended programs for a student (based on interests)
// @route   GET /api/programs/recommendations/:studentId
// @access  Private
export const getRecommendedPrograms = async (req, res) => {
  try {
    const Student = (await import('../models/Student.js')).default;
    const student = await Student.findById(req.params.studentId)
      .populate('interests')
      .populate('parent');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Verify parent owns this student
    if (req.user.role === 'parent' && student.parent._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const studentAge = student.age;
    const interestTagIds = student.interests.map((tag) => tag._id);

    // Build recommendation query
    const query = {
      status: 'published',
      ageMin: { $lte: studentAge },
      ageMax: { $gte: studentAge },
    };

    // If student has interests, prioritize programs with matching tags
    if (interestTagIds.length > 0) {
      query.tags = { $in: interestTagIds };
    }

    // Get recommended programs, sorted by relevance (matching tags) and rating
    const programs = await Program.find(query)
      .populate('category', 'name slug icon')
      .populate('tags', 'name slug')
      .populate('tutor', 'name email')
      .populate({
        path: 'batches',
        match: { status: { $in: ['upcoming', 'active'] } },
      })
      .sort({
        'rating.average': -1,
        createdAt: -1,
      })
      .limit(20);

    // Score programs based on tag matches
    const scoredPrograms = programs.map((program) => {
      const matchingTags = program.tags.filter((tag) =>
        interestTagIds.some((id) => id.toString() === tag._id.toString())
      );
      const score = matchingTags.length;

      return {
        ...program.toObject(),
        recommendationScore: score,
        matchingTags: matchingTags.length,
      };
    });

    // Sort by recommendation score
    scoredPrograms.sort((a, b) => b.recommendationScore - a.recommendationScore);

    res.json({
      programs: scoredPrograms.slice(0, 12), // Return top 12 recommendations
      studentAge,
      interests: student.interests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

