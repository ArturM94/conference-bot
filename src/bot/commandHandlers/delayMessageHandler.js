const { Scene, Markup } = require('telegraf');

const { isAdmin, getUsers } = require('../../database/wrappers/user');
const { addZero } = require('../../helpers/time');
const logger = require('../../helpers/logger');
// const upload = require('../../helpers/uploadFile');

const delay = new Scene('delay_message');
const sendingMessage = {};
// const msg = [];

// eslint-disable-next-line consistent-return
delay.enter(async (ctx) => {
  try {
    const admin = await isAdmin(ctx.chat.id);

    if (!admin) {
      ctx.reply('Access denied!\nNot enough rights!');
      return ctx.scene.leave();
    }
    ctx.reply('Сreate a post for all users.');
  } catch (error) {
    logger.error(error);
  }
});

delay.on(/\/send (.+) at (.+)/, async (ctx) => {
  const time = ctx.match[1];
  const message = ctx.match[0];
  sendingMessage.push({ message, time });
  try {
    const buttons = Markup.inlineKeyboard([
      Markup.callbackButton('Send', '@send'),
      Markup.callbackButton('Delete', '@delete'),
    ]);

    const curDate = `${new Date().getHours()}:${addZero(new Date().getMinutes())}`;
    if (sendingMessage.time === curDate) {
      ctx.reply(`${sendingMessage.message}`, buttons.extra());
    }
  } catch (error) {
    logger.error(error);
  }
});


delay.on('callback_query', async (ctx) => {
  try {
    if (ctx.update.callback_query.data === '@delete') {
      ctx.reply('delete');
      ctx.scene.leave();
    } else if (ctx.update.callback_query.data === '@send') {
      const users = await getUsers();
      users.forEach((user) => ctx.telegram.sendingMessage(user.chatId, sendingMessage.message));
      ctx.scene.leave();
    } else {
      ctx.scene.leave();
    }
  } catch (error) {
    logger.error(error);
  }
});

module.exports = delay;
