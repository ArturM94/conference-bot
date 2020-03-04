const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

const { isAdmin, getUsers } = require('../../database/wrappers/user');
const { addNotification } = require('../../database/wrappers/notification');
const { addZero } = require('../../helpers/time');
const upload = require('../../helpers/uploadFile');
const logger = require('../../helpers/logger');

const delay = new Scene('delay_message');
const sendingMessage = {};
const timeMess = [];


// eslint-disable-next-line consistent-return
delay.enter(async (ctx) => {
  try {
    const admin = await isAdmin(ctx.chat.id);

    if (!admin) {
      ctx.reply('Access denied!\nNot enough rights!');
      return ctx.scene.leave();
    }
    ctx.reply('Input time!');
  } catch (error) {
    logger.error(error);
  }
});


delay.hears(/\/send at (.+)/, (ctx) => {
  const time = ctx.match[1];
  timeMess.push({ time });
  console.log(timeMess);
  ctx.reply(`Your message will send  ${time}\n Now input your message:`);
  // ctx.scene.enter('delay');
});


delay.on('message', async (ctx) => {
  const {
    update: { message },
  } = ctx;
  // const time = ctx.match[1];
  // const message = ctx.match[0];
  // sendingMessage.push({ message, time });
  try {
    const buttons = Markup.inlineKeyboard([
      Markup.callbackButton('Send', '@send'),
      Markup.callbackButton('Delete', '@delete'),
    ]);

    const curDate = `${new Date().getHours()}:${addZero(new Date().getMinutes())}`;
    if (message.caption) {
      sendingMessage.text = message.caption;
      const photo = message.photo.reverse()[0].file_id;
      const imgUrl = await upload(photo, ctx);
      sendingMessage.photo = imgUrl;
      const extra = Extra.markup(buttons);
      extra.caption = sendingMessage.text;
      if (timeMess.time === curDate) {
        // eslint-disable-next-line max-len
        const notifPhoto = await addNotification(timeMess.time, sendingMessage.text, sendingMessage.photo);
        console.log(notifPhoto);
      }
    } else {
      sendingMessage.text = message.text;
      const notifText = addNotification(timeMess.time, sendingMessage.text);
      console.log(notifText);
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
