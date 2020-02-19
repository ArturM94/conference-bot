import Speaker from '../models/speaker';
import {isDevelopment} from '../../config';

export const getSpeakers = async () => {
  try {
    return await Speaker.find();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const getSpeaker = async id => {
  try {
    return await Speaker.findById(id);
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const addSpeaker = async (
  first_name,
  last_name,
  position,
  company,
  country,
  topic
) => {
  try {
    const newSpeaker = new Speaker({
      first_name,
      last_name,
      position,
      company,
      country,
      topic
    });
    return await newSpeaker.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const updateSpeaker = async (
  first_name,
  last_name,
  position,
  company,
  country,
  topic
) => {
  try {
    const speaker = await Speaker.findById(id);
    await speaker.update({
      first_name: first_name || user.first_name,
      last_name: last_name || user.last_name,
      position: position || user.position,
      company: company || speaker.company,
      country: country || speaker.country,
      topic: topic || speaker.topic
    });
    return await speaker.save();
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};

export const deleteSpeaker = async id => {
  try {
    return (await Speaker.deleteOne({_id: id})).ok;
  } catch (error) {
    if (isDevelopment) console.log(error.message);
  }
};
