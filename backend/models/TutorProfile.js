import mongoose from 'mongoose';

const tutorProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    qualifications: [
      {
        degree: String,
        institution: String,
        year: Number,
      },
    ],
    certifications: [
      {
        name: String,
        issuingOrganization: String,
        issueDate: Date,
        expiryDate: Date,
      },
    ],
    experience: {
      years: {
        type: Number,
        default: 0,
      },
      description: String,
    },
    specializations: [
      {
        type: String,
        trim: true,
      },
    ],
    ageGroups: [
      {
        type: String,
        enum: ['3-5', '6-8', '9-12', '13-15', '16-18'],
      },
    ],
    languages: [
      {
        type: String,
      },
    ],
    hourlyRate: {
      type: Number,
      default: 0,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    // For background checks and verification
    backgroundCheckStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    backgroundCheckDate: Date,
    // Rating and reviews
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Availability
    availability: {
      days: [
        {
          day: {
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
          },
          timeSlots: [
            {
              start: String, // e.g., "09:00"
              end: String, // e.g., "17:00"
            },
          ],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const TutorProfile = mongoose.model('TutorProfile', tutorProfileSchema);

export default TutorProfile;

