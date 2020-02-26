const Schedule = require('../models/schedule');
const logger = require('../../helpers/logger');

const errorMessage = {
  error: 'Server error',
};

exports.getSchedules = async () => {
  try {
    return await Schedule.find();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getSchedule = async (id) => {
  try {
    return await Schedule.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addSchedule = async (date, flow, speakerId, details = '') => {
  try {
    const newSchedule = new Schedule({
      date,
      flow,
      speakerId,
      details,
    });
    return await newSchedule.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addTechnicalSchedule = async (date, speakerId, details = '') => {
  try {
    return await addSchedule(date, 'technical', speakerId, details);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addNONTechnicalSchedule = async (date, speakerId, details = '') => {
  try {
    return await addSchedule(date, 'non-technical', speakerId, details);
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
    return await schedule.save();
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
