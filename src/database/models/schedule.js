const mongoose = require('mongoose');
const {
  DATABASE: {
    NON_TECHNICAL, TECHNICAL, SPEAKER, SCHEDULE,
  },
} = require('../../constants');

module.exports = mongoose.model(
  SCHEDULE,
  new mongoose.Schema(
    {
      date: {
        type: String,
        require: true,
      },
      flow: {
        type: String,
        enum: [TECHNICAL, NON_TECHNICAL],
        require: true,
      },
      speakerId: {
        type: mongoose.Types.ObjectId,
        ref: SPEAKER,
        require: true,
      },
      details: {
        type: String,
      },
      startTime: {
        type: Date,
        require: true,
      },
      endTime: {
        type: Date,
        require: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
