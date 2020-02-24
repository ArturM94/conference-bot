import AWS from 'aws-sdk';
import axios from 'axios';
import telegram from 'telegraf/telegram';

import logger from './logger';
import config from '../config';

export default async (imgId) => {
  try {
    const file = await telegram.getFile(imgId);

    const img = await axios.get(
      `https://api.telegram.org/file/bot${config.TOKEN_DEV ||
        config.TOKEN_PROD}/${file.file_path}`
    );

    const s3 = new AWS.S3({
      accessKeyId: config.AWS_ACCESS_KEY,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    });
    const params = {
      Bucket: config.BUCKET_NAME,
      Key: `${Date.now().toString()}.jpg`,
      Body: img.data,
    };
    s3.upload(params, async (err, data) => {
      if (err) {
        throw err;
      }
      return data.Location;
    });
  } catch (error) {
    logger.error(error);
  }
};
