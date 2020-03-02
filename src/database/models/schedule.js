const mongoose = require('mongoose');

module.exports = mongoose.model(
  'schedule',
  new mongoose.Schema(
    {
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
      startTime: {
        type: Number,
        require: true,
      },
      endTime: {
        type: Number,
        require: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
