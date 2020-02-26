const mongoose = require('mongoose');

module.exports = mongoose.model(
  'image',
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
    }
  )
);
