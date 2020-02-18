const mongoose = require('mongoose');
const {isDevelopment, URL_DB} = require('../config');

module.exports = async () => {
  try {
    await mongoose.connect(URL_DB, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('Connected to mongodb!');
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};
