const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');

const config = require('./config');
const logger = require('./helpers/logger');
const dbConnect = require('./database/connect');
const commandsHandlers = require('./bot/commandHandlers');
const textHandlers = require('./bot/textHandlers');

const webhook = async (event) => {
  const body = event.body[0] === '{' ? JSON.parse(event.body) : JSON.parse(Buffer.from(event.body, 'base64'));
  const { TOKEN } = config;

  const bot = new Telegraf(TOKEN);
  const stage = new Stage();

  await dbConnect();

  stage.register(
    commandsHandlers.scheduledMessages,
    commandsHandlers.speakers,
    commandsHandlers.savememory,
    commandsHandlers.post,
    commandsHandlers.next,
    commandsHandlers.now,
    commandsHandlers.delayMessage,
  );
  bot.use(session());
  bot.use(stage.middleware());

  // Regular Commands
  bot.command(['start', 'help'], commandsHandlers.startHelp);
  bot.command('speakers', (ctx) => ctx.scene.enter('speakers'));
  bot.command('getmemories', commandsHandlers.getmemories);
  bot.command('savememory', (ctx) => ctx.scene.enter('savememory'));
  bot.command('agenda', commandsHandlers.agenda);
  bot.command('afterparty', commandsHandlers.afterparty);
  bot.command('lunch', commandsHandlers.lunch);
  bot.command('now', (ctx) => ctx.scene.enter('now'));
  bot.command('next', (ctx) => ctx.scene.enter('next'));

  // Admin Commands
  bot.command('scheduled_messages', (ctx) => ctx.scene.enter('scheduledMessages'));
  bot.command('post', (ctx) => ctx.scene.enter('post'));
  bot.command('delay_message', (ctx) => ctx.scene.enter('delay_message'));

  // Handler text messages with Dialogflow
  bot.on('text', textHandlers.withDialogflow);

  bot.catch((error, ctx) => {
    logger.error(`Ooops, encountered an error for ${ctx.updateType}`, error);
  });

  await bot.handleUpdate(body);

  return { statusCode: 200, body: '' };
};

module.exports.webhook = webhook;
