import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please add last name'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please add date of birth'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    grade: {
      type: String,
      trim: true, // e.g., "Grade 3", "Kindergarten"
    },
    school: {
      type: String,
      trim: true,
    },
    specialNeeds: {
      type: String,
      trim: true,
    },
    allergies: [
      {
        type: String,
        trim: true,
      },
    ],
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
    // Parent who manages this kid
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Bookings this student has
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    profilePicture: {
      type: String,
      default: '',
    },
    // Interests (tags the kid is interested in)
    interests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    // Skill levels for different categories/tags
    skillLevels: [
      {
        tag: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tag',
        },
        level: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced'],
          default: 'beginner',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for interests
studentSchema.index({ interests: 1 });

// Virtual for age calculation
studentSchema.virtual('age').get(function () {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

studentSchema.set('toJSON', { virtuals: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;

