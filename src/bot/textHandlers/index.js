const validator = require('validator');

const logger = require('../../helpers/logger');
const { getUserByChatId } = require('../../database/wrappers/user');
const textHandlerWithDialogflow = require('./textHandlerWithDialogflow');
const {
  updateNotification,
} = require('../../database/wrappers/notification');


module.exports.textHandlers = async (ctx) => {
  const currentUser = await getUserByChatId(ctx.chat.id);
  const userState = currentUser.state;
  const { message } = ctx;

  const todayDate = new Date();
  const YEAR = new Date().getFullYear();

  // let responseFromNotifService;
  let newDate;


  switch (userState.title) {
    case 'writeNewTimeScheduledMessages':
      ctx.reply(`You need to write some new Time and your new Time:\n${ctx.message.text}`);
      newDate = new Date(`${YEAR} ${message.text}`);

      if (!validator.toDate(String(newDate))) {
        ctx.reply('Incorrect dateTime, example: 12 March 18:30');
        return;
      }

      if (newDate < todayDate) {
        ctx.reply('The date entered is less than today\'s date.\nTry again!');
        return;
      }
      await updateNotification({
        id: userState.idNotifForEdit,
        date: newDate,
      });
      await ctx.reply('Done! Notification updated!');
      logger.info('Done! Notification "Date" updated!');

      break;
    case 'writeNewTextScheduledMessages':
      ctx.reply(`You need to write some new text and your new text:\n${ctx.message.text}`);
      break;

    default:
      await textHandlerWithDialogflow(ctx);
      break;
  }
};
