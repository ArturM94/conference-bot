import { Markup } from 'telegraf';

import { isAdmin } from '../../database/wrappers/user';
import { getNotifications } from '../../database/wrappers/notification';

// eslint-disable-next-line consistent-return
export default async (ctx) => {
  const userChatId = ctx.chat.id;
  // Will return true if user is Admin
  const admin = await isAdmin(userChatId);

  if (!admin) {
    return ctx.reply('Access denied!\nNot enough rights!');
  }

  const allNotifications = await getNotifications();

  await ctx.reply('All Notifications: ');

  for (let i = 0; i < allNotifications.length; i += 1) {
    // eslint-disable-next-line no-underscore-dangle
    const id = allNotifications[i]._id;
    const { text, date, attachments } = allNotifications[i];

    ctx.reply(
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
};
