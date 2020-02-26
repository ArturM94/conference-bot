const dialogflow = require('dialogflow');
const config = require('../config');
const logger = require('../helpers/logger');

const { PROJECT_ID, SESSION_ID, PRIVATE_KEY, CLIENT_EMAIL } = config;

module.exports = async (message) => {
  try {
    const sessionClient = new dialogflow.SessionsClient({
      credentials: {
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      },
    });

    const sessionPath = sessionClient.sessionPath(PROJECT_ID, SESSION_ID);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en',
        },
      },
    };

    // Send request
    const responses = await sessionClient.detectIntent(request);
    const { displayName } = responses[0].queryResult.intent;

    return {
      displayName,
    };
  } catch (e) {
    logger.error(e);
    return {
      status: 'Error! Request to Dialogflow failed',
    };
  }
};
