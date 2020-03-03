const Schedule = require('../models/schedule');
const logger = require('../../helpers/logger');
const { ERROR: { DATABASE_ERROR }, DATABASE: { NON_TECHNICAL, TECHNICAL } } = require('../../constants');

const errorMessage = {
  error: DATABASE_ERROR,
};

exports.getSchedules = async () => {
  try {
    return Schedule.find().populate('speakerId');
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getSchedule = async (id) => {
  try {
    return Schedule.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};


exports.getScheduleBySpeaker = async (id) => {
  try {
    return Schedule.find({ speakerId: id }).populate('speakerId');
  } catch (error) {
    logger.error(error);
    return undefined;
  }
};

const addSchedule = async (date, flow, speakerId, details = '') => {
  try {
    const newSchedule = new Schedule({
      date,
      flow,
      speakerId,
      details,
    });
    return newSchedule.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addSchedule = addSchedule;

exports.addTechnicalSchedule = async (date, speakerId, details = '') => {
  try {
    return addSchedule(date, TECHNICAL, speakerId, details);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addNONTechnicalSchedule = async (date, speakerId, details = '') => {
  try {
    return await addSchedule(date, NON_TECHNICAL, speakerId, details);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.updateSchedule = async (id, date, flow, speakerId, details = '') => {
  try {
    const schedule = await Schedule.findById(id);
    await schedule.update({
      date: date || schedule.date,
      flow: flow || schedule.flow,
      speakerId: speakerId || schedule.speakerId,
      details: details || schedule.details,
    });
    return schedule.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.deleteSchedule = async (id) => {
  try {
    return (await Schedule.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};
