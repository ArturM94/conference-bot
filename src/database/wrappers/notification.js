import Notification from '../models/notification';
import logger from '../../helpers/logger';

const errorMessage = {
  error: 'Server error',
};

export const getNotifications = async () => {
  try {
    return await Notification.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const getNotification = async (id) => {
  try {
    return await Notification.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const addNotification = async (
  date,
  text,
  attachments = '',
  sent = false
) => {
  try {
    const newNotification = new Notification({
      date,
      text,
      attachments,
      sent,
    });
    return await newNotification.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const updateNotification = async (id, date, text, attachments) => {
  try {
    const notification = await Notification.findById(id);
    await notification.update({
      date: date || notification.date,
      text: text || notification.text,
      attachments: attachments || notification.attachments,
    });
    return await notification.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const sentNotification = async (id) => {
  try {
    const notification = await Notification.findById(id);
    await notification.update({ sent: true });
    return (await notification.save()).sent;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const deleteNotification = async (id) => {
  try {
    return (await Notification.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};
