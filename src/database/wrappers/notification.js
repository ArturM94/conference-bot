import Notification from '../models/notification';
import config from '../config';
const {isDevelopment} = config;

export const getNotifications = async () => {
  try {
    return await Notification.find();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const getNotification = async id => {
  try {
    return await Notification.findById(id);
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const addNotification = async (
  date,
  time,
  text,
  attachments = '',
  sent = false
) => {
  try {
    const newNotification = new Notification({
      date,
      time,
      text,
      attachments,
      sent
    });
    return await newNotification.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const updateNotification = async (id, date, time, text, attachments) => {
  try {
    const notification = await Notification.findById(id);
    await notification.update({
      date: date || notification.date,
      time: time || notification.time,
      text: text || notification.text,
      attachments: attachments || notification.attachments
    });
    return await newNotification.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const sentNotification = async id => {
  try {
    const notification = await Notification.findById(id);
    await notification.update({sent: true});
    return (await notification.save()).sent;
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const deleteNotification = async id => {
  try {
    return (await Notification.deleteOne({_id: id})).ok;
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};
