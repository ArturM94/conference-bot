const dialogflow = require('dialogflow');

module.exports.detectIntent = async (message) => {
  try {
    const sessionClient = new dialogflow.SessionsClient({
      credentials: {
        client_email: process.env.client_email,
        private_key: process.env.private_key,
      },
    });

    const sessionPath = sessionClient.sessionPath(process.env.projectId, process.env.sessionId);

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
