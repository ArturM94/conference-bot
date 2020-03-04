const mongoose = require('mongoose');

const { DATABASE: { USER } } = require('../../constants');

module.exports = mongoose.model(
  USER,
  new mongoose.Schema(
    {
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
        require: false,
        maxlength: 13,
        minlength: 9,
      },
      chatId: {
        type: Number,
        unique: true,
        require: true,
      },
      isAdmin: {
        type: Boolean,
        require: true,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  ),
);
