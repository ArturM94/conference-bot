const winston = require('winston');
const CloudWatchTransport = require('winston-aws-cloudwatch')
require('dotenv').config();

const logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    })
  ]
});


var cloudwatchConfig = {
  logGroupName: 'conference-telegram-bot',
  logStreamName: process.env.NODE_ENV,
  createLogGroup: true,
  createLogStream: true,
  awsConfig: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  },
  formatLog: function (item) {
    return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
  }
}


if (process.env.NODE_ENV === 'dev'){ 
  logger.add(CloudWatchTransport, cloudwatchConfig);
  } 

module.exports = logger;
