const speakersHandler = require('./speakersHandler');
const getmemoriesHandler = require('./getmemoriesHandler');
const sheduledMessagesHandler = require('./sheduledMessagesHandler');
const saveMemoryHandler = require('./saveMemoryHandler');
const agendaCommand = require('./agendaCommand');
const afterpartyCommand = require('./afterpatyCommand');
const postHandler = require('./postHandler');
const startHelpHandler = require('./startHelpHandler');


module.exports = {
  speakers: speakersHandler,
  getmemories: getmemoriesHandler,
  sheduledMessages: sheduledMessagesHandler,
  savememory: saveMemoryHandler,
  agenda: agendaCommand,
  afterparty: afterpartyCommand,
  post: postHandler,
  startHelp: startHelpHandler,
};
