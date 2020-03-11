const logger = require('../../helpers/logger');
const { isAdmin } = require('../../database/wrappers/user');
const { HELP_MSG } = require('../../constants');

module.exports = async (ctx) => {
  try {
    await ctx.replyWithHTML(HELP_MSG.user);

    const admin = await isAdmin(ctx.chat.id);
    if (admin && !admin.error) {
      await ctx.replyWithHTML(HELP_MSG.admin);
    }
  } catch (e) {
    logger.error(e);
  }
};
