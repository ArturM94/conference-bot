import speakersHandler from './speakersHandler';
import saveMemoryHandler from './saveMemoryHandler';
import agendaCommand from './agendaCommand';
import afterpartyCommand from './afterpatyCommand';
import postHandler from './postHandler';

export default {
  speakers: speakersHandler,
  savememory: saveMemoryHandler,
  agenda: agendaCommand,
  afterparty: afterpartyCommand,
  post: postHandler,
};
