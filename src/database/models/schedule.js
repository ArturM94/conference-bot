import mongoose from 'mongoose';

export default mongoose.model(
  'schedule',
  new mongoose.Schema({
    date: {
      type: String,
      require: true,
    },
    flow: {
      type: String,
      enum: ['technical', 'non-technical'],
      require: true,
    },
    speakerId: {
      type: mongoose.Types.ObjectId,
      ref: 'speaker',
      require: true,
    },
    details: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }),
);
