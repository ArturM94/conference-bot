import Schedule from '../models/schedule';

export const etSchedules = async () => {
  try {
    return await Schedule.find();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getSchedule = async (id) => {
  try {
    return await Schedule.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addSchedule = async (date, flow, speakerId, details = '') => {
  try {
    const newSchedule = new Schedule({
      date,
      flow,
      speakerId,
      details,
    });
    return await newSchedule.save();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addTechnicalSchedule = async (date, speakerId, details = '') => {
  try {
    return await addSchedule(date, 'technical', speakerId, details);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addNONTechnicalSchedule = async (
  date,
  speakerId,
  details = ''
) => {
  try {
    return await addSchedule(date, 'non-technical', speakerId, details);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateSchedule = async (
  id,
  date,
  flow,
  speakerId,
  details = ''
) => {
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
    console.log(error);
    return undefined;
  }
};

export const deleteSchedule = async (id) => {
  try {
    return (await Schedule.deleteOne({ _id: id })).ok;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
