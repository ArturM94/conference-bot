const Telegraf = require('telegraf');

const { getSpeakers } = require('../../database/wrappers/speaker');
const logger = require('../../helpers/logger');
const { ERROR } = require('../../constants');

// Function creates an inline keyboard from an object from the database
const createButtons = (dataArray) => {
  const markupKeyboard = Telegraf.Extra.markdown().markup((m) => {
    const list = [];
    dataArray.forEach((el) => {
      const fullName = `${el.firstName} ${el.lastName}`;
      list.push([
        // eslint-disable-next-line no-underscore-dangle
        m.callbackButton(fullName, JSON.stringify({ speakerId: el._id })),
      ]);
    });
    return m.inlineKeyboard(list);
  });
  return markupKeyboard;
};

module.exports = async (ctx) => {
  try {
    const allSpeakers = await getSpeakers();
    if (!allSpeakers.length) {
      return ctx.reply('We don\'t have any speaker!');
    }
    return ctx.reply(
      'All Our Speakers:',
      createButtons(allSpeakers),
    );
  } catch (e) {
    logger.error(`Error in SpeakersHandler.js : ${e.stack}`);
    return ctx.reply(ERROR.SERVER_ERROR);
  }
};
