// const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
// const Extra = require('telegraf/extra');
const WizardScene = require('telegraf/scenes/wizard');

const { isAdmin } = require('../../database/wrappers/user');
// const { addNotification } = require('../../database/wrappers/notification');
const upload = require('../../helpers/uploadFile');
// const logger = require('../../helpers/logger');

const sendingMessage = {};

const delay = new WizardScene(
  'delay_message',
  async (ctx) => {
    const admin = await isAdmin(ctx.chat.id);
    if (!admin) {
      ctx.reply('Access denied!\nNot enough rights!');
      return ctx.scene.leave();
    }
    ctx.wizard.state.data = {};
    ctx.replyWithMarkdown(
      'You are using /delay-message command\n If you want to continue, please click "➡️ Next"',
      Markup.inlineKeyboard([
        Markup.callbackButton('➡️ Next', JSON.stringify({
          action: 'next',
        })),
        Markup.callbackButton('⬅️ Exit', JSON.stringify({
          action: 'exit',
        })),
      ]).extra(),
    );

    return ctx.wizard.next();
  },
  async (ctx) => {
    const callbackQuery = ctx.update.callback_query;
    const { action } = JSON.parse(callbackQuery.data);
    ctx.wizard.state.action = action;
    switch (action) {
      case 'next':
        await ctx.reply('Enter your text:');
        return ctx.wizard.next();
      case 'exit':
        await ctx.reply('You have exited from editing mode!');
        return ctx.scene.leave();
      default:
        return ctx.wizard.next();
    }
  },
  async (ctx) => {
    sendingMessage.text = ctx.message.text;
    await ctx.reply(`${sendingMessage.text}`);
    return ctx.wizard.next();
  },
  async (ctx) => {
    ctx.replyWithMarkdown(
      'Do you want add photo?\n If you want? please "📷 Add"',
      Markup.inlineKeyboard([
        Markup.callbackButton('📷 Add', JSON.stringify({
          action: 'add',
        })),
        Markup.callbackButton('⬅️ Exit', JSON.stringify({
          action: 'skip',
        })),
      ]).extra(),
    );
    return ctx.wizard.next();
  },
  async (ctx) => {
    const callbackQuery = ctx.update.callback_query;
    const { action } = JSON.parse(callbackQuery.data);
    switch (action) {
      case 'add':
        await ctx.reply('Insert photo:');
        return ctx.wizard.next();
      case 'skip':
        await ctx.reply('You have skipped from editing mode!');
        return ctx.scene.leave();
      default:
        return ctx.wizard.next();
    }
  },
  async (ctx) => {
    const photo = ctx.message.photo.reverse()[0].file_id;
    const imgUrl = await upload(photo, ctx);
    sendingMessage.photo = imgUrl;
    return ctx.wizard.next();
  },
);


// eslint-disable-next-line consistent-return
// delay.enter(async (ctx) => {
//   try {
//     const admin = await isAdmin(ctx.chat.id);

//     if (!admin) {
//       ctx.reply('Access denied!\nNot enough rights!');
//       return ctx.scene.leave();
//     }
//     ctx.reply('Input time!\n examp: /send at 2020 18 March 14:00');
//   } catch (error) {
//     logger.error(error);
//   }
// });


// delay.hears(/\/send at (.+) (.+) (.+) (.+)/, (ctx) => {
//   const year = ctx.match[1];
//   const day = ctx.match[2];
//   const month = ctx.match[3];
//   const time = ctx.match[4];
//   timeMess.day = day;
//   timeMess.month = month;
//   timeMess.year = year;
//   timeMess.time = time;
//   ctx.reply(`Your message will send at ${time}\n Now input your message:`);
// });


// delay.on('message', async (ctx) => {
//   const {
//     update: { message },
//   } = ctx;

//   try {
//     const buttons = Markup.inlineKeyboard([
//       Markup.callbackButton('Send', '@send'),
//       Markup.callbackButton('Delete', '@delete'),
//     ]);

//     if (message.caption) {
//       sendingMessage.text = message.caption;
//       const photo = message.photo.reverse()[0].file_id;
//       const imgUrl = await upload(photo, ctx);
//       sendingMessage.photo = imgUrl;
//       const extra = Extra.markup(buttons);
//       extra.caption = sendingMessage.text;
//       await addNotification(timeMess.time, sendingMessage.text, sendingMessage.photo);
//     } else {
//       sendingMessage.text = message.text;
//       const dateField = new Date(`${timeMess.year}
//      ${timeMess.day} ${timeMess.month} ${timeMess.time}`);
//       await addNotification(dateField, sendingMessage.text);
//       ctx.reply('Your message saved!');
//     }
//   } catch (error) {
//     logger.error(error);
//   }
// });

module.exports = delay;
