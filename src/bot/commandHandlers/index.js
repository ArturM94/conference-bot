const startHandler = require('./startHandler');
const helpHandler = require('./helpHandler');
const speakersHandler = require('./speakersHandler');
const getmemoriesHandler = require('./getmemoriesHandler');
const scheduledMessagesHandler = require('./scheduledMessagesHandler');
const saveMemoryHandler = require('./saveMemoryHandler');
const agendaCommand = require('./agendaCommand');
const afterpartyCommand = require('./afterpatyCommand');
const postHandler = require('./postHandler');
const nowHandler = require('./nowHandler');
const lunchHandler = require('./lunchHandler');
const nextHandler = require('./nextHandler');
const delayMessageHandler = require('./delayMessageHandler');


module.exports = {
  start: startHandler,
  help: helpHandler,
  speakers: speakersHandler,
  getmemories: getmemoriesHandler,
  scheduledMessages: scheduledMessagesHandler,
  savememory: saveMemoryHandler,
  agenda: agendaCommand,
  afterparty: afterpartyCommand,
  post: postHandler,
  lunch: lunchHandler,
  now: nowHandler,
  next: nextHandler,
  delayMessage: delayMessageHandler,
};
