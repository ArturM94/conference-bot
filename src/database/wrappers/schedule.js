import Schedule from '../models/schedule';

export const etSchedules = async () => {
  try {
    return await Schedule.find();
  } catch (error) {
    console.log(error);
  }
};

export const getSchedule = async id => {
  try {
    return await Schedule.findById(id);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    if (isDevelopment) console.log(error);
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
    console.log(error);
  }
};

export const deleteSchedule = async id => {
  try {
    return (await Schedule.deleteOne({_id: id})).ok;
  } catch (error) {
    console.log(error);
  }
};
