const { Markup, Extra } = require('telegraf');

const logger = require('../../helpers/logger');
const {
  isAdmin,
  updateUser,
  getUserByChatId,
} = require('../../database/wrappers/user');
const { getActiveNotifications } = require('../../database/wrappers/notification');

/*eslint spaced-comment:0*/
module.exports = async (ctx) => {
  const STATE_NAME = 'startScheduledMessages';
  const userChatId = ctx.chat.id;
  // Will return true if user is Admin
  const admin = await isAdmin(userChatId);
  if (!admin) {
    ctx.reply('Access denied!\nNot enough rights!');
  }
  const allNotifications = await getActiveNotifications();
  // reply with Exit button
  await ctx.reply('Select an action on the keyboard or exit.',
    Extra.markdown().markup((m) => m.keyboard(['⬅️ Exit']).resize()));
  await ctx.reply('All Notifications: ');
  for (let i = 0; i < allNotifications.length; i += 1) {
    // eslint-disable-next-line no-underscore-dangle
    const id = allNotifications[i]._id;
    const { text, date, image } = allNotifications[i];

    ctx.replyWithMarkdown(
      `Text: ${text}
      Date: ${date}
      Image: ${image}`,
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
  const currentUser = await getUserByChatId(userChatId);
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
};
