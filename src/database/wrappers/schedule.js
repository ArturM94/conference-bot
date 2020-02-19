import Schedule from '../models/schedule';

import config from '../config';
const {isDevelopment} = config;

export const etSchedules = async () => {
  try {
    return await Schedule.find();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const getSchedule = async id => {
  try {
    return await Schedule.findById(id);
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const addSchedule = async (
  date,
  time,
  flow,
  speakerId,
  details = ''
) => {
  try {
    const newSchedule = new Schedule({
      date,
      time,
      flow,
      speakerId,
      details
    });
    return await newSchedule.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const addTechnicalSchedule = async (
  date,
  time,
  speakerId,
  details = ''
) => {
  try {
    return await addSchedule(date, time, 'technical', speakerId, details);
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const addNONTechnicalSchedule = async (
  date,
  time,
  speakerId,
  details = ''
) => {
  try {
    return await addSchedule(date, time, 'non-technical', speakerId, details);
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const updateSchedule = async (
  id,
  date,
  time,
  flow,
  speakerId,
  details = ''
) => {
  try {
    const schedule = await Schedule.findById(id);
    await schedule.update({
      date: date || schedule.date,
      time: time || schedule.time,
      flow: flow || schedule.flow,
      speakerId: speakerId || schedule.speakerId,
      details: details || schedule.details
    });
    return await schedule.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const deleteSchedule = async id => {
  try {
    return (await Schedule.deleteOne({_id: id})).ok;
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};
