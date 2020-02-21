import Speaker from '../models/speaker';

export const getSpeakers = async () => {
  try {
    return await Speaker.find();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getSpeaker = async (id) => {
  try {
    return await Speaker.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addSpeaker = async (
  firstName,
  lastName,
  position,
  company,
  country,
  topic
) => {
  try {
    const newSpeaker = new Speaker({
      firstName,
      lastName,
      position,
      company,
      country,
      topic,
    });
    return await newSpeaker.save();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateSpeaker = async (
  id,
  firstName,
  lastName,
  position,
  company,
  country,
  topic
) => {
  try {
    const speaker = await Speaker.findById(id);
    await speaker.update({
      firstName: firstName || speaker.firstName,
      lastName: lastName || speaker.lastName,
      position: position || speaker.position,
      company: company || speaker.company,
      country: country || speaker.country,
      topic: topic || speaker.topic,
    });
    return await speaker.save();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const deleteSpeaker = async (id) => {
  try {
    return (await Speaker.deleteOne({ _id: id })).ok;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
