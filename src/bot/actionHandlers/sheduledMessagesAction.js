import { deleteNotification } from '../../database/wrappers/notification';

export default async (ctx) => {
  const callbackQuery = ctx.update.callback_query;
  const messageId = callbackQuery.message.message_id;

  const { notificationId, action } = JSON.parse(ctx.match.input);

  switch (action) {
    case 'edit':
      await ctx.answerCbQuery('You selected Edit Action!');
      break;

    case 'delete':
      await deleteNotification(notificationId);
      await ctx.answerCbQuery('Done! You deleted notification!');
      ctx.deleteMessage(messageId);
      break;

    default:
      break;
  }
};
