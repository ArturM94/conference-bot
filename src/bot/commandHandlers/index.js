const speakersHandler = require('./speakersHandler');
const getmemoriesHandler = require('./getmemoriesHandler');
const scheduledMessagesHandler = require('./scheduledMessagesHandler');
const saveMemoryHandler = require('./saveMemoryHandler');
const agendaCommand = require('./agendaCommand');
const afterpartyCommand = require('./afterpatyCommand');
const postHandler = require('./postHandler');
const startHelpHandler = require('./startHelpHandler');


module.exports = {
  speakers: speakersHandler,
  getmemories: getmemoriesHandler,
  scheduledMessages: scheduledMessagesHandler,
  savememory: saveMemoryHandler,
  agenda: agendaCommand,
  afterparty: afterpartyCommand,
  post: postHandler,
  startHelp: startHelpHandler,
};
