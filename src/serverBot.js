import 'dotenv/config';
import express from 'express';
import Telegraf from 'telegraf';

import config from './config';

const {
  TOKEN_DEV, WEBHOOK_PATH, WEBHOOK_URL_DEV, WEBHOOK_PORT, APP_PORT,
} = config;

const app = express();
const telegraf = new Telegraf(TOKEN_DEV);

const attachBotWebhook = async (bot, url, path, port) => {
  try {
    await bot.telegram.setWebhook(`${url}${path}`);

    const webhookInfo = await bot.telegram.getWebhookInfo();
    console.log('Webhook successfully attached\n', webhookInfo);

    bot.startWebhook(path, null, port);
  } catch (error) {
    console.log(error);
  }
};

const attachBotHandlers = (bot) => {
  bot.start((ctx) => ctx.reply('welcome!'));

  bot.command('schedule', (ctx) => ctx.reply('schedule command'));
  bot.command('organizers', (ctx) => ctx.reply('organizers command'));
  bot.command('lunch', (ctx) => ctx.reply('lunch command'));
  bot.command('add', (ctx) => ctx.reply('add notification command'));
  bot.command('delete', (ctx) => ctx.reply('delete notification command'));

  bot.on('text', (ctx) => ctx.reply(`hello, ${ctx.message.from.first_name}!`));
  bot.on('sticker', (ctx) => ctx.reply('sticker echo'));
  bot.on('message', (ctx) => ctx.reply('message echo'));

  bot.catch((error, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, error);
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(telegraf.webhookCallback(WEBHOOK_PATH));

attachBotWebhook(telegraf, WEBHOOK_URL_DEV, WEBHOOK_PATH, WEBHOOK_PORT);
attachBotHandlers(telegraf);
telegraf.launch();

app.listen(APP_PORT, () => {
  console.log(`Bot listening on port ${APP_PORT}`);
});
