const validator = require('validator');

const logger = require('../../helpers/logger');
const { getUserByChatId, updateUser } = require('../../database/wrappers/user');
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
    /*eslint spaced-comment:0*/
    case 'writeNewTimeScheduledMessages':
      await ctx.reply(`You need to write some new Time and your new Time:\n${ctx.message.text}`);
      newDate = new Date(`${YEAR} ${message.text}`);

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

      /*eslint no-underscore-dangle:0*/
      await updateUser({ id: currentUser._id, state: {} });
      await ctx.reply('Done! Notification updated!');
      logger.info('Done! Notification "Date" updated!');

      break;
    case 'writeNewTextScheduledMessages':
      await ctx.reply(`You need to write some new text and your new text:\n${ctx.message.text}`);
      try {
        if (!validator.isLength(message.text, { min: 7 })) {
          await ctx.reply('Your message length must be >= 7');
          return;
        }

        await updateNotification({
          id: userState.idNotifForEdit,
          text: message.text,
        });
        await updateUser({ id: currentUser._id, state: {} });
        await ctx.reply('Done! Notification updated!');
        logger.info('Done! Notification "Text" updated!');
      } catch (e) {
        logger.error(`Server Error updating "Text" in Notification collection: ${e}`);
        await ctx.reply('Server Error updating "Text"!');
      }
      break;

    default:
      await textHandlerWithDialogflow(ctx);
      break;
  }
};
