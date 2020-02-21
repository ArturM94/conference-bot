import User from '../models/user';

export const getUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const isAdmin = async (id) => {
  try {
    return (await User.findById(id)).isAdmin;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addUser = async (firstName, lastName, phoneNumber, chatId) => {
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
    console.log(error);
    return undefined;
  }
};

export const addAdmin = async (firstName, lastName, phoneNumber, chatId) => {
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
    console.log(error);
    return undefined;
  }
};

export const updateUser = async (
  id,
  firstName,
  lastName,
  phoneNumber,
  chatId
) => {
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
    console.log(error);
    return undefined;
  }
};

export const deleteUser = async (id) => {
  try {
    return (await User.deleteOne({ _id: id })).ok;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
