import { getImages } from '../../database/wrappers/image';

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

export default async (ctx) => {
  const allImages = await getImages();
  await ctx.replyWithMediaGroup(createAlbum(allImages));
};
