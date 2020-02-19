import User from '../models/user';
import {isDevelopment} from '../../config';

export const getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const getUser = async id => {
  try {
    return await User.findById(id);
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const isAdmin = async id => {
  try {
    return (await User.findById(id)).isAdmin;
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const addUser = async (first_name, last_name, phoneNumber, chatId) => {
  try {
    const newUser = new User({
      first_name,
      last_name,
      phoneNumber,
      chatId,
      isAdmin: false
    });
    return await newUser.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const addAdmin = async (first_name, last_name, phoneNumber, chatId) => {
  try {
    const newAdmin = new User({
      first_name,
      last_name,
      phoneNumber,
      chatId,
      isAdmin: true
    });
    return await newAdmin.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const updateUser = async (
  id,
  first_name,
  last_name,
  phoneNumber,
  chatId
) => {
  try {
    const user = await User.findById(id);
    await user.update({
      first_name: first_name || user.first_name,
      last_name: last_name || user.last_name,
      phoneNumber: phoneNumber || user.phoneNumber,
      chatId: chatId || user.chatId
    });
    return await user.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const deleteUser = async id => {
  try {
    return (await User.deleteOne({_id: id})).ok;
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};