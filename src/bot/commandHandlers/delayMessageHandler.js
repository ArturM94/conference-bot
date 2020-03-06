// const Scene = require('telegraf/scenes/base');
const Markup = require('telegraf/markup');
// const Extra = require('telegraf/extra');
const WizardScene = require('telegraf/scenes/wizard');

const { isAdmin } = require('../../database/wrappers/user');
const { addNotification } = require('../../database/wrappers/notification');
const upload = require('../../helpers/uploadFile');
const { getTimeFromMsg } = require('../../helpers/time');
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
        await ctx.reply('Enter your time like this: 2020 20 May 2:00');
        return ctx.wizard.next();
      case 'exit':
        await ctx.reply('You have exited from editing mode!');
        return ctx.scene.leave();
      default:
        return ctx.wizard.next();
    }
  },
  async (ctx) => {
    sendingMessage.time = ctx.message.text;
    await ctx.reply(`${sendingMessage.time}`);
    ctx.replyWithMarkdown(
      'Now you must input your text, please click "📝 Text"',
      Markup.inlineKeyboard([
        Markup.callbackButton('📝 Text', JSON.stringify({
          action: 'text',
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
      case 'text':
        await ctx.reply('Input your text:');
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

    ctx.replyWithMarkdown(
      'Do you want to add photo?\n If you want please "📷 Add"',
      Markup.inlineKeyboard([
        Markup.callbackButton('📷 Add', JSON.stringify({ action: 'add' })),
        Markup.callbackButton('⏭️ Skip', JSON.stringify({ action: 'skip' })),
      ]).extra(),
    );
    return ctx.wizard.next();
  },
  // eslint-disable-next-line consistent-return
  async (ctx) => {
    const callbackQuery = ctx.update.callback_query;
    const { action } = JSON.parse(callbackQuery.data);
    ctx.wizard.state.action = action;
    const dateField = getTimeFromMsg(sendingMessage.time);
    if (action === 'add') {
      await ctx.reply('Insert your photo');
      sendingMessage.photo = await upload(ctx.update.photo.reverse()[0].file_id, ctx);
      await ctx.reply(sendingMessage.photo);
      await addNotification(dateField, sendingMessage.text, sendingMessage.photo);
    } else {
      ctx.reply('You have exited from editing mode!');
      await addNotification(dateField, sendingMessage.text);
    }

    ctx.scene.leave();
    await ctx.reply('Done! Message will send at!');
  },
);

module.exports = delay;
