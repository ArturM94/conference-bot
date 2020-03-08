const { Markup, Extra } = require('telegraf');

const logger = require('../../helpers/logger');
const { deleteNotification } = require('../../database/wrappers/notification');
const {
  updateUser,
  getUserByChatId,
} = require('../../database/wrappers/user');

/*eslint spaced-comment:0*/
const selectEditDelete = async (ctx) => {
  const STATE_NAME = 'editStepScheduledMessages';
  const callbackQuery = ctx.update.callback_query;
  const { notificationId, action } = JSON.parse(callbackQuery.data);
  const messageId = callbackQuery.message.message_id;
  const currentUser = await getUserByChatId(ctx.chat.id);
  /*eslint no-underscore-dangle:0*/
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

  switch (action) {
    case 'edit':
      await ctx.reply(
        'You selected Edit Action!\nChose what do you want to change.',
        Markup.inlineKeyboard([
          Markup.callbackButton('⌚ Time', JSON.stringify({
            idNotifForEdit: notificationId,
            action: 'time',
          })),
          Markup.callbackButton('📝 Text', JSON.stringify({
            idNotifForEdit: notificationId,
            action: 'text',
          })),
        ]).extra(),
      );
      break;
    case 'delete':
      await deleteNotification(notificationId);
      await updateUser({ id: userId, state: { title: null } });
      await ctx.reply('Done! You deleted notification!', Extra.markup(Markup.removeKeyboard()));
      ctx.deleteMessage(messageId);
      break;

    default:
      break;
  }
};

const selectWhatEdit = async (ctx) => {
  let STATE_NAME;
  const callbackQuery = ctx.update.callback_query;
  const { idNotifForEdit, action } = JSON.parse(callbackQuery.data);

  const currentUser = await getUserByChatId(ctx.chat.id);
  /*eslint no-underscore-dangle:0*/
  const userId = currentUser._id;
  let updatedUser;

  if (action === 'time') {
    STATE_NAME = 'writeNewTimeScheduledMessages';
    await ctx.reply('Please enter new dateTime, expected: YYYY-MM-DDThh:mm');
    updatedUser = await updateUser({
      id: userId,
      state: {
        title: STATE_NAME,
        idNotifForEdit,
        action,
      },
    });
  } else {
    STATE_NAME = 'writeNewTextScheduledMessages';
    await ctx.reply('Please enter new title text for notification.');
    updatedUser = await updateUser({
      id: userId,
      state: {
        title: STATE_NAME,
        idNotifForEdit,
        action,
      },
    });
  }

  if (updatedUser.error) {
    logger.error(`Error, User can't updated!\n${updatedUser.error}`);
    ctx.reply('Error, User can\'t updated');
  }
};

module.exports = {
  selectEditDelete,
  selectWhatEdit,
};