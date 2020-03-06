const mongoose = require('mongoose');

const { DATABASE: { NOTIFiCATION } } = require('../../constants');

module.exports = mongoose.model(
  NOTIFiCATION,
  new mongoose.Schema(
    {
      date: {
        type: Date,
        require: true,
      },
      text: {
        type: String,
        require: true,
      },
      attachments: {
        type: String,
        require: false,
      },
      sticker: {
        type: String,
        require: false,
      },
      sent: {
        type: Boolean,
        default: false,
        require: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
