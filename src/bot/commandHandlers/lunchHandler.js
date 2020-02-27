const { getScheduleByDetails } = require('../../database/wrappers/schedule');
const { getImagesByOwnerId } = require('./../../database/wrappers/image');

// command '/lunch'
export default async (ctx) => {
  const image = await getImagesByOwnerId(ctx.chat.id);
  const shedule = await getScheduleByDetails('example');
  await ctx.replyWithPhoto(`${image.imageUrl}`, { caption: `${shedule.date}` });
};
