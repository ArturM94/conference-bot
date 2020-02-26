const speakersHandler = require('./speakersHandler');
const saveMemoryHandler = require('./saveMemoryHandler');
const agendaCommand = require('./agendaCommand');
const afterpartyCommand = require('./afterpatyCommand');
const postHandler = require('./postHandler');

module.exports = {
  speakers: speakersHandler,
  savememory: saveMemoryHandler,
  agenda: agendaCommand,
  afterparty: afterpartyCommand,
  post: postHandler,
};
