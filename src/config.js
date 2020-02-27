const ENV = process.env;

const WELCOME_MSG = {
  user: `
  <b>Available Bot Commands</b>
  <b>/speakers<i> - get all speakers</i></b>
  <b>/lunch<i> - shows when it will be lunch</i></b>
  <b>/now<i> - shows active speakers at the moment</i></b>
  <b>/next<i> - shows the next speakers</i></b>
  <b>/agenda<i> - shows all schedule</i></b>
  <b>/afterparty<i> - shows location information</i></b>
  <b>/savememories<i> - allows you to save photos</i></b>
  <b>/getmemories<i> - shows all saved photos</i></b>
  `,
  admin: `
  <b>ADMIN Commands</b>
  <b>/post<i> - allows you to send a message to all users now</i></b>
  <b>/delay_message<i> - allows you to schedule send a message</i></b>
  <b>/scheduled_messages<i> - allows you to edit scheduled notifications</i></b>
  `,
};

module.exports = {
  NODE_ENV: ENV.NODE_ENV,
  APP_PORT: ENV.APP_PORT,
  TOKEN_DEV: ENV.TOKEN_DEV,
  TOKEN_PROD: ENV.TOKEN_PROD,
  WEBHOOK_PATH: ENV.WEBHOOK_PATH,
  WEBHOOK_PORT: ENV.WEBHOOK_PORT,
  WEBHOOK_URL: ENV.WEBHOOK_URL,
  URL_DB: ENV.URL_DB,
  AWS_ACCESS_KEY: ENV.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: ENV.AWS_SECRET_ACCESS_KEY,
  BUCKET_NAME: process.env.BUCKET_NAME,
  AWS_REGION: ENV.AWS_REGION,
  PROJECT_ID: ENV.PROJECT_ID,
  SESSION_ID: ENV.SESSION_ID,
  PRIVATE_KEY: ENV.PRIVATE_KEY,
  CLIENT_EMAIL: ENV.CLIENT_EMAIL,
  WELCOME_MSG,
};
