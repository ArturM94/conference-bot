require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  isProduction,
  isDevelopment: !isProduction,
  TOKEN: process.env.TOKEN,
  PORT: process.env.PORT,
  URL_DB: process.env.URL_DB
};
