const Image = require('../models/image');
const logger = require('../../helpers/logger');

const errorMessage = {
  error: 'Server error',
};

exports.getImages = async () => {
  try {
    return await Image.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getImagesByUserId = async (id) => {
  try {
    return await Image.find({ owner: id });
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getImage = async (id) => {
  try {
    return await Image.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addImage = async (owner, imageUrl) => {
  try {
    const newImage = new Image({
      owner,
      imageUrl,
    });
    return await newImage.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.deleteImage = async (id) => {
  try {
    return (await Image.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};
