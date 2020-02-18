const Notification = require('../models/notification');
const {isDevelopment} = require('../../config');

exports.getNotifications = async () => {
  try {
    return await Notification.find();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

exports.getNotification = async id => {
  try {
    return await Notification.findById(id);
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

exports.addNotification = async (
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

exports.updateNotification = async (id, date, time, text, attachments) => {
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

exports.sentNotification = async id => {
  try {
    const notification = await Notification.findById(id);
    await notification.update({sent: true});
    return (await notification.save()).sent;
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

exports.deleteNotification = async id => {
  try {
    return (await Notification.deleteOne({_id: id})).ok;
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};
