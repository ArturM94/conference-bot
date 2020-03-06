const Notification = require('../models/notification');
const logger = require('../../helpers/logger');
const { ERROR: { DATABASE_ERROR } } = require('../../constants');

const errorMessage = {
  error: DATABASE_ERROR,
};

const getNotifications = async () => {
  try {
    return Notification.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getActiveNotifications = async () => {
  try {
    return Notification.find({ sent: false });
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getNotification = async (id) => {
  try {
    return Notification.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const addNotification = async (
  date,
  text,
  image = '',
  sent = false,
) => {
  try {
    const newNotification = new Notification({
      date,
      text,
      image,
      sent,
    });
    return newNotification.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const updateNotification = async ({
  id,
  date,
  text,
  image,
}) => {
  try {
    const notification = await Notification.findById(id);
    await notification.updateOne({
      date: date || notification.date,
      text: text || notification.text,
      image: image || notification.image,
    });
    return notification.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const sentNotification = async (id) => {
  try {
    const notification = await Notification.findById(id);
    await notification.update({ sent: true });
    return (await notification.save()).sent;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const deleteNotification = async (id) => {
  try {
    return (await Notification.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

module.exports = {
  getNotifications,
  getActiveNotifications,
  getNotification,
  addNotification,
  updateNotification,
  sentNotification,
  deleteNotification,
};
