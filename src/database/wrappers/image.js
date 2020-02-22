import Image from '../models/image';
import logger from '../../aws/handler';

export const getImages = async () => {
  try {
    return await Image.find();
  } catch (error) {
    logger.error(error);
  }
};

export const getImagesByUserId = async (id) => {
  try {
    return await Image.find({ owner: id });
  } catch (error) {
    logger.error(error);
  }
};

export const getImage = async (id) => {
  try {
    return await Image.findById(id);
  } catch (error) {
    logger.error(error);
  }
};

export const addImage = async (owner, imageUrl) => {
  try {
    const newImage = new Image({
      owner,
      imageUrl,
    });
    return await newImage.save();
  } catch (error) {
    logger.error(error);
  }
};

export const deleteImage = async (id) => {
  try {
    return (await Image.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
  }
};
