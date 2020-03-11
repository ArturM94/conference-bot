const logger = require('../../helpers/logger');
const {
  isAdmin,
  getUserByChatId,
  addUser,
} = require('../../database/wrappers/user');
const { WELCOME_MSG } = require('../../constants');

module.exports = async (ctx) => {
  try {
    // check if user is registered
    const currentUser = await getUserByChatId(ctx.chat.id);
    // if user is not registered, register new user
    if (!currentUser) {
      const newUser = await addUser({
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        chatId: ctx.chat.id,
      });
      if (!newUser.error) {
        logger.info(`New user with chat.id "${newUser.chatId}" was successfully registered!`);
      }
    }
    const admin = await isAdmin(ctx.chat.id);
    if (admin && !admin.error) {
      await ctx.replyWithHTML(WELCOME_MSG.admin);
    } else {
      await ctx.replyWithHTML(WELCOME_MSG.user);
    }
  } catch (e) {
    logger.error(e);
  }
};
