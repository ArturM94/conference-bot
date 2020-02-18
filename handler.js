'use strict';

module.exports.logger = async event => {
  logger.info('hello', { message: 'world' });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
