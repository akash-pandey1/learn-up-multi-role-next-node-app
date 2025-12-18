import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    // Who made the booking (parent)
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Which kid is enrolled
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    // Which program
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    // Which batch/time slot
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Batch',
      required: true,
    },
    // Payment information
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'bank_transfer', 'cash'],
    },
    paymentId: String,
    paidAt: Date,
    // Booking status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    // Dates
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    cancelledAt: Date,
    cancellationReason: String,
    // Refund information
    refundAmount: {
      type: Number,
      default: 0,
    },
    refundedAt: Date,
    refundReason: String,
    // Notes
    notes: {
      type: String,
      trim: true,
    },
    // Parent notes for tutor
    parentNotes: String,
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
bookingSchema.index({ parent: 1, status: 1 });
bookingSchema.index({ student: 1, status: 1 });
bookingSchema.index({ program: 1, batch: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

