export default {
  NODE_ENV: process.env.NODE_ENV,
  APP_PORT: process.env.APP_PORT,
  TOKEN_DEV: process.env.TOKEN_DEV,
  TOKEN_PROD: process.env.TOKEN_PROD,
  WEBHOOK_PATH: process.env.WEBHOOK_PATH,
  WEBHOOK_PORT: process.env.WEBHOOK_PORT,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  URL_DB: process.env.URL_DB,
  dialogflow: {
    PROJECT_ID: process.env.PROJECT_ID,
    SESSION_ID: process.env.SESSION_ID,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    CLIENT_EMAIL: process.env.CLIENT_EMAIL,
  },
};
