const mongoose = require('mongoose');

module.exports = mongoose.model(
  'notification',
  new mongoose.Schema({
    date: {
      type: String,
      require: true
    },
    tome: {
      type: String,
      require: true
    },
    text: {
      type: String,
      require: true
    },
    attachments: {
      type: String,
      require: false
    },
    sent: {
      type: Boolean,
      default: false,
      require: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })
);