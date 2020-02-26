import 'dotenv/config';
import express from 'express';
import Telegraf from 'telegraf';
import Stage from 'telegraf/stage';
import session from 'telegraf/session';

import logger from './helpers/logger';
import handlers from './bot/commandHandlers/index';
import actions from './bot/actionHandlers/index';
import dbConnect from './database/connect';
import config from './config';

let TOKEN;
const {
  NODE_ENV, WEBHOOK_PATH, WEBHOOK_URL, WEBHOOK_PORT, APP_PORT,
} = config;

if (NODE_ENV === 'production') {
  TOKEN = config.TOKEN_PROD;
} else {
  TOKEN = config.TOKEN_DEV;
}

dbConnect();
const app = express();
const telegraf = new Telegraf(TOKEN);

const attachBotWebhook = async (bot, url, path, port) => {
  try {
    await bot.telegram.setWebhook(`${url}${path}`);

    const webhookInfo = await bot.telegram.getWebhookInfo();
    logger.info('Webhook successfully attached\n', webhookInfo);

    bot.startWebhook(path, null, port);
  } catch (error) {
    logger.error(error);
  }
};

const attachBotHandlers = (bot) => {
  bot.command(['start', 'help'], (ctx) => ctx.reply(`
  /speakers - get all speakers
  /getmemories - get all images

  admin:
  /scheduled_messages - get list notification for edit/del
  `));

  const stage = new Stage();
  stage.register(
    handlers.sheduledMessages,
  );
  bot.use(session());
  bot.use(stage.middleware());

  // Bot Commands Start
  bot.command('speakers', handlers.speakers);
  bot.command('getmemories', handlers.getmemories);
  // Bot Commands End

  // Admin Commands Start
  bot.command('scheduled_messages', (ctx) => ctx.scene.enter('sheduledMessages'));
  // Admin Commands End

  // Bot Actions Start
  bot.action(/speakerId/, actions.speakers);
  // Bot Actions End

  bot.command('schedule', (ctx) => ctx.reply('schedule command'));
  bot.command('organizers', (ctx) => ctx.reply('organizers command'));
  bot.command('lunch', (ctx) => ctx.reply('lunch command'));
  bot.command('add', (ctx) => ctx.reply('add notification command'));
  bot.command('delete', (ctx) => ctx.reply('delete notification command'));

  bot.on('text', (ctx) => ctx.reply(`hello, ${ctx.message.from.first_name}!`));
  bot.on('sticker', (ctx) => ctx.reply('sticker echo'));
  bot.on('message', (ctx) => ctx.reply('message echo'));

  bot.catch((error, ctx) => {
    logger.error(`Ooops, encountered an error for ${ctx.updateType}`, error);
  });
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(telegraf.webhookCallback(WEBHOOK_PATH));

attachBotWebhook(telegraf, WEBHOOK_URL, WEBHOOK_PATH, WEBHOOK_PORT);
attachBotHandlers(telegraf);
telegraf.launch();

app.listen(APP_PORT, () => {
  logger.info(`Bot listening on port ${APP_PORT}`);
});
