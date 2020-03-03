const mongoose = require('mongoose');

const { DATABASE: { IMAGE } } = require('../../constants');

module.exports = mongoose.model(
  IMAGE,
  new mongoose.Schema(
    {
      owner: {
        type: String,
        require: true,
      },
      imageUrl: {
        type: String,
        require: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);
