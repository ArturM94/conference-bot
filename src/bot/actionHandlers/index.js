const speakers = require('./speakers');

module.exports.actionHandlers = (bot) => {
  bot.action(/speakerId/, speakers);
};
