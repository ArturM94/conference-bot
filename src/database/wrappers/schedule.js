const Schedule = require('../models/schedule');
const logger = require('../../helpers/logger');
const { ERROR: { DATABASE_ERROR }, DATABASE: { NON_TECHNICAL, TECHNICAL } } = require('../../constants');

const errorMessage = {
  error: DATABASE_ERROR,
};

const getSchedules = async () => {
  try {
    return Schedule.find().populate('speakerId');
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getSchedule = async (id) => {
  try {
    return Schedule.findById(id);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getScheduleByDetails = async (some) => {
  try {
    return await Schedule.find({ details: some });
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getScheduleBySpeaker = async (id) => {
  try {
    return Schedule.find({ speakerId: id }).populate('speakerId');
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getScheduleByTime = async (time) => {
  try {
    return Schedule.find({ startTime: { $lte: new Date(time) }, endTime: { $gt: new Date(time) } }).populate('speakerId');
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const getScheduleByNextTime = async (time) => {
  try {
    return Schedule.find({ startTime: { $gte: time }, endTime: { $gte: time } }).populate('speakerId');
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};


const addSchedule = async ({
  date,
  flow,
  speakerId,
  details = '',
  startTime,
  endTime,
}) => {
  try {
    const newSchedule = new Schedule({
      date,
      flow,
      speakerId,
      details,
      startTime,
      endTime,
    });
    return newSchedule.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const addTechnicalSchedule = async ({
  date,
  speakerId,
  details = '',
}) => {
  try {
    return addSchedule(date, TECHNICAL, speakerId, details);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const addNONTechnicalSchedule = async ({
  date,
  speakerId,
  details = '',
}) => {
  try {
    return await addSchedule(date, NON_TECHNICAL, speakerId, details);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};
const updateSchedule = async ({
  id,
  date,
  flow,
  speakerId,
  details = '',
  startTime,
  endTime,
}) => {
  try {
    const schedule = await Schedule.findById(id);
    await schedule.update({
      date: date || schedule.date,
      flow: flow || schedule.flow,
      speakerId: speakerId || schedule.speakerId,
      details: details || schedule.details,
      startTime: startTime || schedule.startTime,
      endTime: endTime || schedule.endTime,
    });
    return schedule.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

const deleteSchedule = async (id) => {
  try {
    return (await Schedule.deleteOne({ _id: id })).ok;
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

module.exports = {
  getSchedules,
  getSchedule,
  getScheduleByDetails,
  getScheduleBySpeaker,
  addSchedule,
  getScheduleByTime,
  getScheduleByNextTime,
  addTechnicalSchedule,
  addNONTechnicalSchedule,
  updateSchedule,
  deleteSchedule,
};
