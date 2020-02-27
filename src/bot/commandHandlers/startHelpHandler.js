const logger = require('../../helpers/logger');
const { isAdmin } = require('../../database/wrappers/user');
const { WELCOME_MSG } = require('../../helpers/constants');

module.exports = async (ctx) => {
  try {
    await ctx.replyWithHTML(WELCOME_MSG.user);

    if (isAdmin) {
      await ctx.replyWithHTML(WELCOME_MSG.admin);
    }
  } catch (e) {
    logger.error(e);
  }
};
