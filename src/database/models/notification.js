const mongoose = require('mongoose');

const { DATABASE: { NOTIFICATION } } = require('../../constants');

module.exports = mongoose.model(
  NOTIFICATION,
  new mongoose.Schema(
    {
      date: {
        type: Date,
        require: true,
      },
      text: {
        type: String,
        require: false,
      },
      image: {
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
