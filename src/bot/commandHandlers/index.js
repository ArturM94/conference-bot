import speakersHandler from './speakersHandler';
import getmemoriesHandler from './getmemoriesHandler';
import sheduledMessagesHandler from './sheduledMessagesHandler';
import nowHandler from './nowHandler';
import lunchHandler from './lunchHandler';

module.exports = {
  speakers: speakersHandler,
  getmemories: getmemoriesHandler,
  sheduledMessages: sheduledMessagesHandler,
  nowSpeaker: nowHandler,
  lunch: lunchHandler,
};
