
const logger = require('./logger');

module.exports.logger = async () => {
  logger.info('hello', { message: 'world' });
};
