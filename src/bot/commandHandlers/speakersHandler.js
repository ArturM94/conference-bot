const Telegraf = require('telegraf');

const { getSpeakers } = require('../../database/wrappers/speaker');
const logger = require('../../helpers/logger');
const { ERROR } = require('../../constants');
const {
  updateUser,
  getUserByChatId,
} = require('../../database/wrappers/user');

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
    const STATE_NAME = 'speakersCommand';
    const userChatId = ctx.chat.id;

    const currentUser = await getUserByChatId(userChatId);
    // eslint-disable-next-line no-underscore-dangle
    const userId = currentUser._id;
    const updatedUser = await updateUser({
      id: userId,
      state: {
        title: STATE_NAME,
      },
    });

    if (updatedUser.error) {
      logger.error(`Error, User can't updated!\n${updatedUser.error}`);
      ctx.reply('Error, User can\'t updated');
    }

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
