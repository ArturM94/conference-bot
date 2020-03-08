const speakers = require('./speakers');
const scheduledMassages = require('./scheduledMassages');

module.exports.actionHandlers = (bot) => {
  bot.action(/speakerId/, speakers);
  bot.action(/notificationId/, scheduledMassages.selectEditDelete);
  bot.action(/idNotifForEdit/, scheduledMassages.selectWhatEdit);
};
