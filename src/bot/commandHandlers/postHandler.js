const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
const Extra = require('telegraf/extra');

const { isAdmin, getUsers } = require('../../database/wrappers/user');
const upload = require('../../helpers/uploadFile');
const logger = require('../../helpers/logger');

const post = new Scene('post');
const sendMessage = {};


// eslint-disable-next-line consistent-return
post.enter(async (ctx) => {
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

post.on('message', async (ctx) => {
  const {
    update: { message },
  } = ctx;

  try {
    const buttons = Markup.inlineKeyboard([
      Markup.callbackButton('✅ Send', '@send'),
      Markup.callbackButton('❌ Delete', '@delete'),
    ]);
    if (message.caption) {
      sendMessage.text = message.caption;
      const photo = message.photo.reverse()[0].file_id;
      const imgUrl = await upload(photo, ctx);
      sendMessage.photo = imgUrl;
      const extra = Extra.markup(buttons);
      extra.caption = sendMessage.text;
      ctx.telegram.sendPhoto(
        ctx.chat.id,
        'http://qnimate.com/wp-content/uploads/2014/03/images2.jpg',
        extra,
      );
    } else {
      sendMessage.text = message.text;
      ctx.reply(sendMessage.text, buttons.extra());
    }
  } catch (error) {
    logger.error(error);
  }
});

post.on('callback_query', async (ctx) => {
  try {
    if (ctx.update.callback_query.data === '@delete') {
      ctx.reply('delete');
      ctx.scene.leave();
    } else if (ctx.update.callback_query.data === '@send') {
      const users = await getUsers();
      if (sendMessage.photo) {
        users.forEach((user) => ctx.telegram.sendPhoto(
          user.chatId,
          sendMessage.photo,
          sendMessage.text,
        ));
      } else {
        users.forEach((user) => ctx.telegram.sendMessage(user.chatId, sendMessage.text));
      }
      ctx.scene.leave();
    } else {
      ctx.scene.leave();
    }
  } catch (error) {
    logger.error(error);
  }
});

module.exports = post;
