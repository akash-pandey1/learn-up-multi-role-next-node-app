import TutorProfile from '../models/TutorProfile.js';
import User from '../models/User.js';

// @desc    Get tutor profile
// @route   GET /api/tutor-profiles/:id
// @access  Public
export const getTutorProfile = async (req, res) => {
  try {
    const tutorProfile = await TutorProfile.findById(req.params.id).populate('user', 'name email phone');

    if (!tutorProfile) {
      return res.status(404).json({ message: 'Tutor profile not found' });
    }

    res.json(tutorProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's tutor profile
// @route   GET /api/tutor-profiles/me
// @access  Private/Tutor
export const getMyTutorProfile = async (req, res) => {
  try {
    if (req.user.role !== 'tutor') {
      return res.status(403).json({ message: 'Only tutors can access their profile' });
    }

    const tutorProfile = await TutorProfile.findOne({ user: req.user._id }).populate('user', 'name email phone');

    if (!tutorProfile) {
      return res.status(404).json({ message: 'Tutor profile not found. Please complete your profile setup.' });
    }

    res.json(tutorProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update tutor profile
// @route   PUT /api/tutor-profiles/:id
// @access  Private/Tutor
export const updateTutorProfile = async (req, res) => {
  try {
    const tutorProfile = await TutorProfile.findById(req.params.id);

    if (!tutorProfile) {
      return res.status(404).json({ message: 'Tutor profile not found' });
    }

    // Only tutor can update their own profile (or admin)
    if (
      req.user.role !== 'admin' &&
      tutorProfile.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorized to update this profile' });
    }

    const updatedProfile = await TutorProfile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('user', 'name email phone');

    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tutor profiles (for browsing)
// @route   GET /api/tutor-profiles
// @access  Public
export const getTutorProfiles = async (req, res) => {
  try {
    const { verified, specialization, rating } = req.query;
    const query = {};

    if (verified === 'true') {
      query.isVerified = true;
    }

    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    if (rating) {
      query['rating.average'] = { $gte: parseFloat(rating) };
    }

    const tutorProfiles = await TutorProfile.find(query)
      .populate('user', 'name email phone')
      .sort({ 'rating.average': -1, 'rating.count': -1 });

    res.json(tutorProfiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

