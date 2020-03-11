const { Markup, Extra } = require('telegraf');
const validator = require('validator');

const logger = require('../../../helpers/logger');
const {
  getUserStateByChatId,
  deleteUserState,
} = require('../../../database/wrappers/user');
const { updateNotification } = require('../../../database/wrappers/notification');

module.exports = async (ctx) => {
  try {
    const userChatId = ctx.chat.id;
    const userState = await getUserStateByChatId(userChatId);
    const { message } = ctx;

    // let responseFromNotifService;
    if (!validator.isLength(message.text, { min: 7 })) {
      await ctx.reply('Your message length must be >= 7');
      return;
    }

    await updateNotification({
      id: userState.idNotifForEdit,
      text: message.text,
    });

    await deleteUserState(userChatId);
    await ctx.reply(`Done! Notification updated!\nNew notification text: ${message.text}`,
      Extra.markup(Markup.removeKeyboard()));

    logger.info('Done! Notification "Text" updated!');
  } catch (e) {
    logger.error(`Server Error updating "Text" in Notification collection: ${e}`);
    await ctx.reply('Server Error updating "Text"!');
  }
};
