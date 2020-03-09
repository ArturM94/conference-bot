const speakers = require('./speakers');
const scheduledMassages = require('./scheduledMassages');
const { getUserByChatId } = require('../../database/wrappers/user');

module.exports.actionHandlers = async (ctx) => {
  const currentUser = await getUserByChatId(ctx.chat.id);
  const userStateTitle = currentUser.state.title;
  const callbackQueryData = JSON.parse(ctx.update.callback_query.data);

  switch (userStateTitle) {
    case 'startScheduledMessages':
      await scheduledMassages.selectEditDelete(ctx);
      break;
    case 'selectedEditActionScheduledMessages':
      if (callbackQueryData.action === 'time' || callbackQueryData.action === 'text') {
        await scheduledMassages.selectWhatEdit(ctx);
      }
      break;
    case 'speakersCommand':
      await speakers(ctx);
      break;

    default:
      break;
  }
};
