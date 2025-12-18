import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a tag name'],
      unique: true,
      trim: true,
      // e.g., "Football", "Yoga", "Cricket", "Martial Arts", "Painting", "Guitar"
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Tag must belong to a category'],
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // Usage count for analytics
    usageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from name before saving
tagSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

// Index for efficient queries
// Note: slug already has unique: true which creates an index automatically
tagSchema.index({ category: 1 });

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;

