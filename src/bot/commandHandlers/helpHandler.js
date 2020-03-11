const logger = require('../../helpers/logger');
const { isAdmin } = require('../../database/wrappers/user');
const { HELP_MSG } = require('../../constants');

module.exports = async (ctx) => {
  try {
    // reply available commands for user
    await ctx.replyWithHTML(HELP_MSG.user);

    const admin = await isAdmin(ctx.chat.id);
    if (admin && !admin.error) {
      // reply available commands for Admin
      await ctx.replyWithHTML(HELP_MSG.admin);
    }
  } catch (e) {
    logger.error(e);
  }
};
