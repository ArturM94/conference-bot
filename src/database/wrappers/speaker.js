const Speaker = require('../models/speaker');
const logger = require('../../helpers/logger');

const errorMessage = {
  error: 'Server error',
};

exports.getSpeakers = async () => {
  try {
    return await Speaker.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getSpeaker = async (id) => {
  try {
    return await Speaker.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getSpeakersBySchedule = async (id) => {
  try {
    return Speaker.find({ _id: id });
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
    return await newSpeaker.save();
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
    return await speaker.save();
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
