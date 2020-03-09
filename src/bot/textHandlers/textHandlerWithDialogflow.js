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
        await commandsHandlers.lunch(ctx);
        break;
      case 'nowSpeakers':
        await commandsHandlers.now(ctx);
        break;
      case 'nextSpeakers':
        await commandsHandlers.next(ctx);
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
        await commandsHandlers.delayMessage(ctx);
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
