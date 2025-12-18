import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      // e.g., "Morning Batch", "Weekend Batch", "Batch 1"
    },
    // Schedule
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    // Days of the week
    days: [
      {
        type: String,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        required: true,
      },
    ],
    // Time slot
    startTime: {
      type: String,
      required: true,
      // Format: "HH:MM" in 24-hour format, e.g., "09:00", "14:30"
    },
    endTime: {
      type: String,
      required: true,
    },
    // Capacity
    maxStudents: {
      type: Number,
      required: true,
      min: 1,
    },
    currentEnrollment: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Status
    status: {
      type: String,
      enum: ['upcoming', 'active', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    // Students enrolled in this batch
    enrolledStudents: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Student',
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // Sessions
    sessions: [
      {
        date: Date,
        startTime: String,
        endTime: String,
        topic: String,
        notes: String,
        status: {
          type: String,
          enum: ['scheduled', 'completed', 'cancelled'],
          default: 'scheduled',
        },
        attendance: [
          {
            student: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Student',
            },
            present: {
              type: Boolean,
              default: false,
            },
            notes: String,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Check if batch is full
batchSchema.methods.isFull = function () {
  return this.currentEnrollment >= this.maxStudents;
};

// Check if batch has space
batchSchema.methods.hasSpace = function () {
  return this.currentEnrollment < this.maxStudents;
};

const Batch = mongoose.model('Batch', batchSchema);

export default Batch;

