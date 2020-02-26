const speakersHandler = require('./speakersHandler');
const getmemoriesHandler = require('./getmemoriesHandler');
const sheduledMessagesHandler = require('./sheduledMessagesHandler');

module.exports = {
  speakers: speakersHandler,
  getmemories: getmemoriesHandler,
  sheduledMessages: sheduledMessagesHandler,
};
