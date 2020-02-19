
import logger from './logger';

module.exports.logger = async () => {
  logger.info('hello', { message: 'world' });
};
