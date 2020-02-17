const dotenv = require("dotenv");
const PATH = require("path");

const root = PATH.join.bind("../");
dotenv.config({path: root(".env")});

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = !isProduction;
const TOKEN = process.env.TOKEN;
const PORT = process.env.PORT;
const URL_DB = process.env.URL_DB;

module.exports = {
  isDevelopment,
  isProduction,
  URL_DB,
  TOKEN,
  PORT
};
