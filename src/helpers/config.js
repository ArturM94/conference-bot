const ENV = process.env;

module.exports = {
  NODE_ENV: ENV.NODE_ENV,
  AWS_ACCESS_KEY: ENV.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: ENV.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: ENV.AWS_REGION,
  APP_PORT: ENV.APP_PORT,
  TOKEN_DEV: ENV.TOKEN_DEV,
  TOKEN_PROD: ENV.TOKEN_PROD,
  WEBHOOK_PATH: ENV.WEBHOOK_PATH,
  WEBHOOK_PORT: ENV.WEBHOOK_PORT,
  WEBHOOK_URL: ENV.WEBHOOK_URL,
  PROJECT_ID: ENV.PROJECT_ID,
  SESSION_ID: ENV.SESSION_ID,
  PRIVATE_KEY: ENV.PRIVATE_KEY,
  CLIENT_EMAIL: ENV.CLIENT_EMAIL,
};