const { getUserStateByChatId } = require('../../database/wrappers/user');
const textHandlerWithDialogflow = require('./textHandlerWithDialogflow');
const scheduledMessages = require('./scheduledMessages/index');


module.exports.textHandlers = async (ctx) => {
  const userChatId = ctx.chat.id;
  const userState = await getUserStateByChatId(userChatId);

  switch (userState.title) {
    case 'writeNewTimeScheduledMessages':
      await scheduledMessages.writeNewTime(ctx);
      break;
    case 'writeNewTextScheduledMessages':
      await scheduledMessages.writeNewText(ctx);
      break;

    default:
      await textHandlerWithDialogflow(ctx);
      break;
  }
};
