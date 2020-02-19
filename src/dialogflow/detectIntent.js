import dialogflow from 'dialogflow';
import config from '../config';

const {
  PROJECT_ID, SESSION_ID, PRIVATE_KEY, CLIENT_EMAIL,
} = config.dialogflow;

export default async (message) => {
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

    return {
      status: 'Success',
      data: responses,
    };
  } catch (e) {
    console.log(e);
    return {
      status: 'Error! Request to Dialogflow failed',
    };
  }
};
