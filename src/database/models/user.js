import mongoose from 'mongoose';

export default mongoose.model(
  'user',
  new mongoose.Schema({
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      require: true,
      maxlength: 13,
      minlength: 9,
    },
    chatId: {
      type: Number,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);
