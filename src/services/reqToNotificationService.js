const axios = require('axios');

const logger = require('../helpers/logger');
const {
  NOTIFICATION_SERVICE_URL,
  NOTIFICATION_SERVICE_API_KEY,
} = require('../config');
const {
  getNotification,
} = require('../database/wrappers/notification');

const reqToAdd = async ({
  id,
  text,
  date,
  image,
  sticker,
}) => {
  try {
    const responseFromService = await axios.post(`${NOTIFICATION_SERVICE_URL}/jobs`, {
      id,
      text,
      date,
      image,
      sticker,
    }, {
      headers: {
        api_key: NOTIFICATION_SERVICE_API_KEY,
      },
    });
    return responseFromService;
  } catch (e) {
    logger.error(`Error Requesting "add" to the Notification Service: ${e.stack}`);
    return false;
  }
};

const reqToUpdate = async ({
  id,
  newText,
  newDate,
  newImage,
}) => {
  try {
    const currentNotification = await getNotification(id);
    const responseFromService = await axios.put(`${NOTIFICATION_SERVICE_URL}/jobs/${id}`, {
      text: newText || currentNotification.text,
      date: newDate || currentNotification.date,
      image: newImage || currentNotification.image,
      sticker: currentNotification.sticker,
    }, {
      headers: {
        api_key: NOTIFICATION_SERVICE_API_KEY,
      },
    });
    return responseFromService;
  } catch (e) {
    logger.error(`Error Requesting "update" to the Notification Service: ${e.stack}`);
    return false;
  }
};

const reqToDelete = async (id) => {
  try {
    const responseFromService = await axios.delete(`${NOTIFICATION_SERVICE_URL}/jobs/${id}`, {
      headers: {
        api_key: NOTIFICATION_SERVICE_API_KEY,
      },
    });
    return responseFromService;
  } catch (e) {
    logger.error(`Error Requesting "Delete" to the Notification Service: ${e.stack}`);
    return false;
  }
};

module.exports = {
  reqToAdd,
  reqToUpdate,
  reqToDelete,
};
