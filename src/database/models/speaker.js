import mongoose from 'mongoose';

export default mongoose.model(
  'speaker',
  new mongoose.Schema({
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    company: {
      type: String,
      require: false,
    },
    country: {
      type: String,
      require: false,
    },
    topic: {
      type: String,
      unique: true,
      require: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }),
);
