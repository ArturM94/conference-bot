const Image = require('../models/image');
const logger = require('../../helpers/logger');
const { ERROR: { DATABASE_ERROR } } = require('../../constants');

const errorMessage = {
  error: DATABASE_ERROR,
};

exports.getImages = async () => {
  try {
    return Image.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getImagesByUserId = async (id) => {
  try {
    return Image.find({ owner: id });
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getImage = async (id) => {
  try {
    return Image.findById(id);
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
    return newImage.save();
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
