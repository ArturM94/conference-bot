const Speaker = require('../models/speaker');
const logger = require('../../helpers/logger');
const { ERROR: { DATABASE_ERROR } } = require('../../constants');

const errorMessage = {
  error: DATABASE_ERROR,
};

exports.getSpeakers = async () => {
  try {
    return Speaker.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getSpeaker = async (id) => {
  try {
    return Speaker.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addSpeaker = async (
  firstName,
  lastName,
  image,
  position,
  company,
  country,
  topic,
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
    return newSpeaker.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.updateSpeaker = async (
  id,
  firstName,
  lastName,
  image,
  position,
  company,
  country,
  topic,
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
    return speaker.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.deleteSpeaker = async (id) => {
  try {
    return (await Speaker.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};
