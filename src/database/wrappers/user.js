const User = require('../models/user');
const logger = require('../../helpers/logger');

const errorMessage = {
  error: 'Server error',
};

exports.getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getUserByChatId = async (chatId) => {
  try {
    return await User.findOne({ chatId });
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.isAdmin = async (chatId) => {
  try {
    return (await User.findOne({ chatId })).isAdmin;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addUser = async (firstName, lastName, phoneNumber, chatId) => {
  try {
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      chatId,
      isAdmin: false,
    });
    return await newUser.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addAdmin = async (firstName, lastName, phoneNumber, chatId) => {
  try {
    const newAdmin = new User({
      firstName,
      lastName,
      phoneNumber,
      chatId,
      isAdmin: true,
    });
    return await newAdmin.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.updateUser = async (id, firstName, lastName, phoneNumber, chatId) => {
  try {
    const user = await User.findById(id);
    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastNames,
      phoneNumber: phoneNumber || user.phoneNumber,
      chatId: chatId || user.chatId,
    });
    return await user.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.deleteUser = async (id) => {
  try {
    return (await User.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};
