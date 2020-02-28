const { getScheduleByDetails } = require('../../database/wrappers/schedule');
const { getImagesByOwnerId } = require('./../../database/wrappers/image');
const logger = require('../../helpers/logger');

// command '/lunch'
module.exports = async (ctx) => {
  try {
    const image = await getImagesByOwnerId(ctx.chat.id);
    console.log(image);
    const shedule = await getScheduleByDetails('example');
    await ctx.replyWithPhoto(`${image[0].imageUrl}`, { caption: `${shedule[0].date}` });
  } catch (e) {
    logger.error(e);
    console.log(e);
  }
};
