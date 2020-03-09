const User = require('../models/user');
const logger = require('../../helpers/logger');
const { ERROR: { DATABASE_ERROR } } = require('../../constants');

const errorMessage = {
  error: DATABASE_ERROR,
};

const getUsers = async () => {
  try {
    return User.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getUser = async (id) => {
  try {
    return User.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getUserByChatId = async (chatId) => {
  try {
    return User.findOne({ chatId });
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getUserStateByChatId = async (chatId) => {
  try {
    const user = await User.findOne({ chatId });
    return user.state;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const isAdmin = async (chatId) => {
  try {
    return (await User.findOne({ chatId })).isAdmin;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const addUser = async ({
  firstName,
  lastName,
  chatId,
  phoneNumber,
}) => {
  try {
    const newUser = new User({
      firstName,
      lastName,
      chatId,
      phoneNumber,
      isAdmin: false,
    });
    return newUser.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const addAdmin = async ({
  firstName,
  lastName,
  phoneNumber,
  chatId,
}) => {
  try {
    const newAdmin = new User({
      firstName,
      lastName,
      phoneNumber,
      chatId,
      isAdmin: true,
    });
    return newAdmin.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const updateUser = async ({
  id,
  firstName,
  lastName,
  phoneNumber,
  chatId,
  state,
}) => {
  try {
    const user = await User.findById(id);
    await user.updateOne({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      phoneNumber: phoneNumber || user.phoneNumber,
      chatId: chatId || user.chatId,
      state: state || user.state,
    });
    return user.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const updateUserState = async ({
  chatId,
  state,
}) => {
  try {
    const user = await User.findOne({ chatId });
    await user.updateOne({
      state,
    });
    return user.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const deleteUser = async (id) => {
  try {
    return (await User.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const deleteUserState = async (chatId) => {
  try {
    const user = await User.findOne({ chatId });
    await user.updateOne({
      state: { title: null },
    });
    return user.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

module.exports = {
  getUsers,
  getUser,
  getUserByChatId,
  getUserStateByChatId,
  isAdmin,
  addUser,
  addAdmin,
  updateUser,
  updateUserState,
  deleteUser,
  deleteUserState,
};
