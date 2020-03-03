require('dotenv').config();
const express = require('express');
const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const logger = require('./helpers/logger');
const commandsHandlers = require('./bot/commandHandlers');
const textHandlers = require('./bot/textHandlers');
const dbConnect = require('./database/connect');
const config = require('./config');

const {
  TOKEN, WEBHOOK_PATH, WEBHOOK_URL, WEBHOOK_PORT, PORT,
} = config;

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
  const stage = new Stage();

  stage.register(
    commandsHandlers.scheduledMessages,
    commandsHandlers.speakers,
    commandsHandlers.savememory,
    commandsHandlers.post,
  );
  bot.use(session());
  bot.use(stage.middleware());

  // Bot Commands Start
  bot.command(['start', 'help'], commandsHandlers.startHelp);
  bot.command('speakers', (ctx) => ctx.scene.enter('speakers'));
  bot.command('getmemories', commandsHandlers.getmemories);
  bot.command('savememory', (ctx) => ctx.scene.enter('savememory'));
  bot.command('agenda', commandsHandlers.agenda);
  bot.command('afterparty', commandsHandlers.afterparty);
  // Bot Commands End

  // Admin Commands Start
  bot.command('scheduled_messages', (ctx) => ctx.scene.enter('scheduledMessages'));
  bot.command('post', (ctx) => ctx.scene.enter('post'));
  // Admin Commands End

  // Handler text messages with Dialogflow
  bot.on('text', textHandlers.withDialogflow);

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

app.listen(PORT, () => {
  logger.info(`Bot listening on port ${PORT}`);
});
