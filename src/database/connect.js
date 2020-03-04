const mongoose = require('mongoose');

const config = require('../config');
const logger = require('../helpers/logger');

const { URL_DB } = config;

module.exports = async () => {
  try {
    await mongoose.connect(URL_DB, {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    logger.info('Connected to mongodb!');
  } catch (error) {
    logger.error(error);
  }
};
