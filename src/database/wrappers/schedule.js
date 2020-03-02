const Schedule = require('../models/schedule');
const logger = require('../../helpers/logger');

const errorMessage = {
  error: 'Server error',
};

exports.getSchedules = async () => {
  try {
    return await Schedule.find().populate('speakerId');
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

exports.getScheduleByDetails = async (some) => {
  try {
    return await Schedule.find({ details: some });
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getScheduleBySpeaker = async (id) => {
  try {
    return await Schedule.find({ speakerId: id }).populate('speakerId');
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getScheduleByTime = async (time) => {
  try {
    return Schedule.find({ startTime: { $lte: new Date(time) }, endTime: { $gt: new Date(time) } }).populate('speakerId');
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.getScheduleByNextTime = async (time) => {
  try {
    return Schedule.find({ startTime: { $gte: time }, endTime: { $gte: time } }).populate('speakerId');
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

// exports.getScheduleByStartTime = async (time) => {
//   try {
//     return await Schedule.find({ startTime: time });
//   } catch (error) {
//     logger.error(error);
//     return errorMessage;
//   }
// };

// exports.getScheduleByEndTime = async (time) => {
//   try {
//     return await Schedule.find({ endTime: time });
//   } catch (error) {
//     logger.error(error);
//     return errorMessage;
//   }
// };

const addSchedule = async (date, flow, speakerId, details = '', startTime, endTime) => {
  try {
    const newSchedule = new Schedule({
      date,
      flow,
      speakerId,
      details,
      startTime,
      endTime,
    });
    return await newSchedule.save();
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addSchedule = addSchedule;

exports.addTechnicalSchedule = async (date, speakerId, details = '', startTime, endTime) => {
  try {
    return await addSchedule(date, 'technical', speakerId, details, startTime, endTime);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.addNONTechnicalSchedule = async (
  date,
  speakerId,
  details = '',
  startTime,
  endTime,
) => {
  try {
    return await addSchedule(date, 'non-technical', speakerId, details, startTime, endTime);
  } catch (error) {
    logger.error(error);
    return errorMessage;
  }
};

exports.updateSchedule = async (
  id,
  date,
  flow,
  speakerId,
  details = '',
  startTime,
  endTime,
) => {
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
