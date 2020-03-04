const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

const { isAdmin } = require('../../database/wrappers/user');
const { addNotification } = require('../../database/wrappers/notification');
const upload = require('../../helpers/uploadFile');
const logger = require('../../helpers/logger');

const delay = new Scene('delay_message');
const sendingMessage = {};
const timeMess = {};


// eslint-disable-next-line consistent-return
delay.enter(async (ctx) => {
  try {
    const admin = await isAdmin(ctx.chat.id);

    if (!admin) {
      ctx.reply('Access denied!\nNot enough rights!');
      return ctx.scene.leave();
    }
    ctx.reply('Input time!\n examp: /send at 2020 18 March 14:00');
  } catch (error) {
    logger.error(error);
  }
});


delay.hears(/\/send at (.+) (.+) (.+) (.+)/, (ctx) => {
  const year = ctx.match[1];
  const day = ctx.match[2];
  const month = ctx.match[3];
  const time = ctx.match[4];
  timeMess.day = day;
  timeMess.month = month;
  timeMess.year = year;
  timeMess.time = time;
  ctx.reply(`Your message will send at ${time}\n Now input your message:`);
});


delay.on('message', async (ctx) => {
  const {
    update: { message },
  } = ctx;

  try {
    const buttons = Markup.inlineKeyboard([
      Markup.callbackButton('Send', '@send'),
      Markup.callbackButton('Delete', '@delete'),
    ]);

    if (message.caption) {
      sendingMessage.text = message.caption;
      const photo = message.photo.reverse()[0].file_id;
      const imgUrl = await upload(photo, ctx);
      sendingMessage.photo = imgUrl;
      const extra = Extra.markup(buttons);
      extra.caption = sendingMessage.text;
      await addNotification(timeMess.time, sendingMessage.text, sendingMessage.photo);
    } else {
      sendingMessage.text = message.text;
      const dateField = new Date(`${timeMess.year} ${timeMess.day} ${timeMess.month} ${timeMess.time}`);
      await addNotification(dateField, sendingMessage.text);
      ctx.reply('Your message saved!');
    }
  } catch (error) {
    logger.error(error);
  }
});


// delay.on('callback_query', async (ctx) => {
//   try {
//     if (ctx.update.callback_query.data === '@delete') {
//       ctx.reply('delete');
//       ctx.scene.leave();
//     } else if (ctx.update.callback_query.data === '@send') {
//       const users = await getUsers();
//       users.forEach((user) => ctx.telegram.sendingMessage(user.chatId, sendingMessage.message));
//       ctx.scene.leave();
//     } else {
//       ctx.scene.leave();
//     }
//   } catch (error) {
//     logger.error(error);
//   }
// });

module.exports = delay;
