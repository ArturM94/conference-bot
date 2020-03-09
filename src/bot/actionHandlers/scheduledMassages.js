/* eslint-disable no-underscore-dangle */
const { Markup, Extra } = require('telegraf');

const logger = require('../../helpers/logger');
const { deleteNotification } = require('../../database/wrappers/notification');
const {
  updateUserState,
  deleteUserState,
} = require('../../database/wrappers/user');

const selectEditDelete = async (ctx) => {
  const STATE_NAME = 'selectedEditActionScheduledMessages';
  const callbackQuery = ctx.update.callback_query;
  const { notificationId, action } = JSON.parse(callbackQuery.data);
  const messageId = callbackQuery.message.message_id;
  const userChatId = ctx.chat.id;

  switch (action) {
    case 'edit':
      try {
        await updateUserState({ chatId: userChatId, state: { title: STATE_NAME } });
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
      } catch (e) {
        logger.error(`Some error Edit action, ${e.stack}`);
      }
      break;
    case 'delete':
      try {
        await deleteNotification(notificationId);
        await deleteUserState(ctx.chat.id);
        await ctx.reply('Done! You deleted notification!', Extra.markup(Markup.removeKeyboard()));
        await ctx.deleteMessage(messageId);
      } catch (e) {
        logger.error(`Some error Delete action, ${e.stack}`);
      }
      break;

    default:
      break;
  }
};

const selectWhatEdit = async (ctx) => {
  let STATE_NAME;
  const callbackQuery = ctx.update.callback_query;
  const { idNotifForEdit, action } = JSON.parse(callbackQuery.data);

  const userChatId = ctx.chat.id;
  let updatedUser;

  switch (action) {
    case 'time':
      try {
        STATE_NAME = 'writeNewTimeScheduledMessages';
        await ctx.reply('Please enter new dateTime, expected: 12 March 18:30');
        updatedUser = await updateUserState({
          chatId: userChatId,
          state: {
            title: STATE_NAME,
            idNotifForEdit,
            action,
          },
        });
      } catch (e) {
        logger.error(`Error, write new Time/date Notification, ${e.stack}`);
      }
      break;
    case 'text':
      try {
        STATE_NAME = 'writeNewTextScheduledMessages';
        await ctx.reply('Please enter new title text for notification.');
        updatedUser = await updateUserState({
          chatId: userChatId,
          state: {
            title: STATE_NAME,
            idNotifForEdit,
            action,
          },
        });
      } catch (e) {
        logger.error(`Error, write new text Notification, ${e.stack}`);
      }
      break;

    default:
      break;
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
