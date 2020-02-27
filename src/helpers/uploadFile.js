const AWS = require('aws-sdk');
const axios = require('axios');

const logger = require('./logger');
const config = require('../config');

// eslint-disable-next-line consistent-return
const downloadFile = async (imgId, ctx) => {
  try {
    const file = await ctx.telegram.getFile(imgId);
    const img = await axios.get(
      `https://api.telegram.org/file/bot${config.TOKEN_DEV
      || config.TOKEN_PROD}/${file.file_path}`,
    );
    return img.data;
  } catch (error) {
    logger.error(error);
  }
};
module.downloadFile = downloadFile;

// eslint-disable-next-line consistent-return
module.exports = async (imgId, ctx) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: config.AWS_ACCESS_KEY,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });
    const params = {
      Bucket: config.BUCKET_NAME,
      Key: `${Date.now().toString()}.jpg`,
      Body: await downloadFile(imgId, ctx),
    };
    const url = await s3.upload(params).promise();
    return url.Location;
  } catch (error) {
    logger.error(error);
  }
};
