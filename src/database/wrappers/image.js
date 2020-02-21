import Image from '../models/image';

export const getImages = async () => {
  try {
    return await Image.find();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getImagesByUserId = async (id) => {
  try {
    return await Image.find({ owner: id });
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const getImage = async (id) => {
  try {
    return await Image.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const addImage = async (owner, imageUrl) => {
  try {
    const newImage = new Image({
      owner,
      imageUrl,
    });
    return await newImage.save();
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const deleteImage = async (id) => {
  try {
    return (await Image.deleteOne({ _id: id })).ok;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
