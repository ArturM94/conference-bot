
const logger = require('./helpers/logger');

module.exports.logger = async () => {
  logger.info('hello 🔥 ', { message: 'world' });
};
