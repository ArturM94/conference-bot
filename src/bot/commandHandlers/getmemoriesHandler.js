const { getImages } = require('../../database/wrappers/image');
const logger = require('../../helpers/logger');

// Function for creating albom with images
function createAlbum(arrImg) {
  const images = [];
  if (arrImg.length >= 10) {
    arrImg.splice(10);
  }
  for (let i = 0; i < arrImg.length; i += 1) {
    const el = arrImg[i];
    images.push({
      media: el.imageUrl,
      caption: 'From URL',
      type: 'photo',
    });
  }

  return images;
}

module.exports = async (ctx) => {
  try {
    const allImages = await getImages();
    await ctx.replyWithMediaGroup(createAlbum(allImages));
  } catch (e) {
    logger.error(e);
  }
};
