const detectIntentFunc = require('../../dialogflow/detectIntent');
const logger = require('../../helpers/logger');
const commandsHandlers = require('../commandHandlers/index');

module.exports = async (ctx) => {
  try {
    const { message } = ctx;
    const detectedIntent = await detectIntentFunc(message.text);

    switch (detectedIntent.displayName) {
      case 'startHelp':
        await commandsHandlers.startHelp(ctx);
        break;
      case 'speakers':
        await commandsHandlers.speakers(ctx);
        break;
      case 'lunch':
        // commandsHandlers.getmemories(ctx);
        break;
      case 'nowSpeakers':
        // commandsHandlers.scheduledMessages(ctx);
        break;
      case 'nextSpeakers':
        // commandsHandlers.savememory(ctx);
        break;
      case 'agenda':
        await commandsHandlers.agenda(ctx);
        break;
      case 'afterparty':
        await commandsHandlers.afterparty(ctx);
        break;
      case 'savememories':
        ctx.scene.enter('savememory');
        break;
      case 'getmemories':
        await commandsHandlers.getmemories(ctx);
        break;
      case 'postAdmin':
        ctx.scene.enter('post');
        break;
      case 'delayMessageAdmin':
        // commandsHandlers.savememory(ctx);
        break;
      case 'scheduledMessagesAdmin':
        await commandsHandlers.scheduledMessages(ctx);
        break;

      default:
        break;
    }
  } catch (e) {
    logger.error(`Some error in textHandlerWithDialogflow.js: ${e}`);
  }
};
