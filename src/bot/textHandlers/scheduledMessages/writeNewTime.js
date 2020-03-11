const { Markup, Extra } = require('telegraf');
const validator = require('validator');

const logger = require('../../../helpers/logger');
const {
  getUserStateByChatId,
  deleteUserState,
} = require('../../../database/wrappers/user');
const {
  updateNotification,
} = require('../../../database/wrappers/notification');

module.exports = async (ctx) => {
  const userChatId = ctx.chat.id;
  const userState = await getUserStateByChatId(userChatId);
  const { message } = ctx;

  const todayDate = new Date();
  const YEAR = new Date().getFullYear();

  // let responseFromNotifService;

  const newDate = new Date(`${YEAR} ${message.text}`);

  if (!validator.toDate(String(newDate))) {
    await ctx.reply('Incorrect dateTime, example: 12 March 18:30');
    return;
  }

  if (newDate < todayDate) {
    await ctx.reply('The date entered is less than today\'s date.\nTry again!');
    return;
  }
  await updateNotification({
    id: userState.idNotifForEdit,
    date: newDate,
  });

  await deleteUserState(userChatId);
  await ctx.reply(`Done! Notification updated!\nNew Time: ${message.text} ${YEAR}`,
    Extra.markup(Markup.removeKeyboard()));
  logger.info('Done! Notification "Date" updated!');
};
