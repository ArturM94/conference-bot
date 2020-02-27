const logger = require('../../helpers/logger');
const { isAdmin } = require('../../database/wrappers/user');
const config = require('../../config');

module.exports = async (ctx) => {
  try {
    await ctx.replyWithHTML(config.WELCOME_MSG.user);

    if (isAdmin) {
      await ctx.replyWithHTML(config.WELCOME_MSG.admin);
    }
  } catch (e) {
    logger.error(e);
  }
};
