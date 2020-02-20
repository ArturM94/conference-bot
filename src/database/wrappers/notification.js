import Notification from '../models/notification';

export const getNotifications = async () => {
  try {
    return await Notification.find();
  } catch (error) {
    console.log(error);
  }
};

export const getNotification = async id => {
  try {
    return await Notification.findById(id);
  } catch (error) {
    console.log(error);
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
      sent,
    });
    return await newNotification.save();
  } catch (error) {
    console.log(error);
  }
};

export const updateNotification = async (id, date, time, text, attachments) => {
  try {
    const notification = await Notification.findById(id);
    await notification.update({
      date: date || notification.date,
      time: time || notification.time,
      text: text || notification.text,
      attachments: attachments || notification.attachments,
    });
    return await newNotification.save();
  } catch (error) {
    console.log(error);
  }
};

export const sentNotification = async id => {
  try {
    const notification = await Notification.findById(id);
    await notification.update({sent: true});
    return (await notification.save()).sent;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotification = async id => {
  try {
    return (await Notification.deleteOne({_id: id})).ok;
  } catch (error) {
    console.log(error);
  }
};
