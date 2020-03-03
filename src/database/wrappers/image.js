const Image = require('../models/image');
const logger = require('../../helpers/logger');
const { ERROR: { DATABASE_ERROR } } = require('../../constants');

const errorMessage = {
  error: DATABASE_ERROR,
};

const getImages = async () => {
  try {
    return Image.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getImagesByUserId = async (id) => {
  try {
    return Image.find({ owner: id });
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getImage = async (id) => {
  try {
    return Image.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const addImage = async (owner, imageUrl) => {
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

const deleteImage = async (id) => {
  try {
    return (await Image.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

module.exports = {
  getImages,
  getImagesByUserId,
  getImage,
  addImage,
  deleteImage,
};
