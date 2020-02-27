const { Markup, Extra } = require('telegraf');
const WizardScene = require('telegraf/scenes/wizard');
const validator = require('validator');

const { isAdmin } = require('../../database/wrappers/user');
const {
  updateNotification,
  getNotifications,
  deleteNotification,
} = require('../../database/wrappers/notification');

const sheduledMessages = new WizardScene(
  'sheduledMessages',
  async (ctx) => {
    const userChatId = ctx.chat.id;
    // Will return true if user is Admin
    const admin = await isAdmin(userChatId);
    if (!admin) {
      ctx.reply('Access denied!\nNot enough rights!');
      return ctx.scene.leave();
    }

    const allNotifications = await getNotifications();
    // reply with Exit button
    await ctx.reply('Select an action on the keyboard or exit.',
      Extra.markdown().markup((m) => m.keyboard(['⬅️ Exit']).resize()));
    await ctx.reply('All Notifications: ');
    for (let i = 0; i < allNotifications.length; i += 1) {
      // eslint-disable-next-line no-underscore-dangle
      const id = allNotifications[i]._id;
      const { text, date, attachments } = allNotifications[i];

      ctx.replyWithMarkdown(
        `Text: ${text}
        Date: ${date}
        Attachments: ${attachments}`,
        Markup.inlineKeyboard([
          Markup.callbackButton('📝 Edit', JSON.stringify({
            notificationId: id,
            action: 'edit',
          })),
          Markup.callbackButton('❌ Delete', JSON.stringify({
            notificationId: id,
            action: 'delete',
          })),
        ]).extra(),
      );
    }
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.reply('Chose what do you want to change.', Markup.removeKeyboard());
    const callbackQuery = ctx.update.callback_query;
    const { notificationId, action } = JSON.parse(callbackQuery.data);
    const messageId = callbackQuery.message.message_id;

    ctx.wizard.state.action = action;

    switch (action) {
      case 'edit':
        await ctx.reply(
          'You selected Edit Action!',
          Markup.inlineKeyboard([
            Markup.callbackButton('⌚ Time', JSON.stringify({
              notificationId,
              action: 'time',
            })),
            Markup.callbackButton('📝 Text', JSON.stringify({
              notificationId,
              action: 'text',
            })),
          ]).extra(),
        );
        return ctx.wizard.next();
      case 'delete':
        await deleteNotification(notificationId);
        await ctx.answerCbQuery('Done! You deleted notification!');
        await ctx.answerCbQuery(`Done! You deleted notification! id: ${notificationId}`);
        ctx.deleteMessage(messageId);
        return ctx.scene.leave();

      default:
        return ctx.scene.leave();
    }
  },
  async (ctx) => {
    const wizardState = ctx.wizard.state;
    const callbackQuery = ctx.update.callback_query;
    const { notificationId, action } = JSON.parse(callbackQuery.data);

    wizardState.editNotificationId = notificationId;
    wizardState.editAction = action;

    if (action === 'time') {
      await ctx.reply('Please enter new dateTime, expected: YYYY-MM-DDThh:mm');
    } else {
      await ctx.reply('Please enter new title text for notification.');
    }
    return ctx.wizard.next();
  },
  async (ctx) => {
    const wizardState = ctx.wizard.state;
    const { message } = ctx;

    switch (wizardState.editAction) {
      case 'time':
        if (!validator.isISO8601(message.text, { strict: true }
          && !validator.isLength(message.text, { min: 16 }))) {
          ctx.reply('Incorrect dateTime: expected YYYY-MM-DDThh:mm');
          return;
        }
        updateNotification(
          wizardState.editNotificationId,
          message.text,
        );
        break;
      case 'text':
        if (!validator.isLength(message.text, { min: 10 })) {
          ctx.reply('Your message length must be >= 10');
          return;
        }
        updateNotification(
          wizardState.editNotificationId,
          false,
          message.text,
        );
        break;
      default:
        break;
    }
    ctx.scene.leave();
    await ctx.reply('Done! Notification updated!');
    ctx.reply('You exit from editing mode!', Extra.markup(Markup.removeKeyboard()));
  },
);

sheduledMessages.hears('⬅️ Exit', (ctx) => {
  ctx.reply('You exit from editing mode!', Extra.markup(Markup.removeKeyboard()));
  return ctx.scene.leave();
});

module.exports = sheduledMessages;
