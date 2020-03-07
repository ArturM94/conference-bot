const { Markup, Extra } = require('telegraf');

const { isAdmin } = require('../../database/wrappers/user');
const { getActiveNotifications } = require('../../database/wrappers/notification');

module.exports = async (ctx) => {
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
  // const updatedUser = await updateUser({ id: userChatId });
};
