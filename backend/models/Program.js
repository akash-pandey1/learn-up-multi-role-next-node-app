import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a program title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    shortDescription: {
      type: String,
      maxlength: 200,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Category & Tags
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Program must belong to a category'],
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    // Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceType: {
      type: String,
      enum: ['per_session', 'per_month', 'one_time'],
      default: 'per_session',
    },
    // Age requirements
    ageMin: {
      type: Number,
      required: true,
      min: 3,
    },
    ageMax: {
      type: Number,
      required: true,
      max: 18,
    },
    // Program details
    duration: {
      type: Number, // in minutes
      required: true,
    },
    maxStudents: {
      type: Number,
      required: true,
      min: 1,
    },
    minStudents: {
      type: Number,
      default: 1,
      min: 1,
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'all'],
      default: 'all',
    },
    // Location
    locationType: {
      type: String,
      enum: ['online', 'in_person', 'both'],
      required: true,
    },
    location: {
      address: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    onlineLink: String, // For online sessions
    // Media
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    thumbnail: {
      type: String,
      default: '',
    },
    // Curriculum/Syllabus
    curriculum: [
      {
        week: Number,
        title: String,
        description: String,
        learningObjectives: [String],
      },
    ],
    // Requirements
    materials: [
      {
        name: String,
        description: String,
        required: {
          type: Boolean,
          default: true,
        },
      },
    ],
    prerequisites: String,
    // Status
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
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
    // Batches (different time slots)
    batches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient filtering
programSchema.index({ category: 1 });
programSchema.index({ tags: 1 });
programSchema.index({ tutor: 1 });
programSchema.index({ ageMin: 1, ageMax: 1 });
programSchema.index({ price: 1 });
programSchema.index({ status: 1 });
programSchema.index({ 'rating.average': -1 });

const Program = mongoose.model('Program', programSchema);

export default Program;

