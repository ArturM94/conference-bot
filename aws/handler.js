'use strict';
import logger from './logger'

module.exports.logger = async event => {
  logger.info('hello', { message: 'world' });
};
