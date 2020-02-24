import Speaker from '../models/speaker';
import logger from '../../helpers/logger';

const errorMessage = {
  error: 'Server error',
};

export const getSpeakers = async () => {
  try {
    return await Speaker.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const getSpeaker = async (id) => {
  try {
    return await Speaker.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const addSpeaker = async (
  firstName,
  lastName,
  image,
  position,
  company,
  country,
  topic
) => {
  try {
    const newSpeaker = new Speaker({
      firstName,
      lastName,
      image,
      position,
      company,
      country,
      topic,
    });
    return await newSpeaker.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const updateSpeaker = async (
  id,
  firstName,
  lastName,
  image,
  position,
  company,
  country,
  topic
) => {
  try {
    const speaker = await Speaker.findById(id);
    await speaker.update({
      firstName: firstName || speaker.firstName,
      lastName: lastName || speaker.lastName,
      image: image || speaker.image,
      position: position || speaker.position,
      company: company || speaker.company,
      country: country || speaker.country,
      topic: topic || speaker.topic,
    });
    return await speaker.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

export const deleteSpeaker = async (id) => {
  try {
    return (await Speaker.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};
