const winston = require('winston');
const CloudWatchTransport = require('winston-aws-cloudwatch');
const config = require('../config');

const { NODE_ENV, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_REGION } = config;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
    }),
  ],
});

const cloudwatchConfig = {
  logGroupName: 'conference-telegram-bot',
  logStreamName: NODE_ENV,
  createLogGroup: true,
  createLogStream: true,
  awsConfig: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  },
  formatLog: (item) =>
    `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`,
};

logger.add(new CloudWatchTransport(cloudwatchConfig));

module.exports = logger;
