const { Extra, Markup } = require('telegraf');

const { deleteUserState } = require('../../database/wrappers/user');
const logger = require('../../helpers/logger');


module.exports = async (ctx) => {
  const userId = ctx.chat.id;

  const delStateResp = await deleteUserState(userId);

  if (delStateResp.error) {
    logger.error('Some error while deleting the state, hearsHandler "exit.js"',
      Extra.markup(Markup.removeKeyboard()));
    return ctx.reply('Sorry, some error while deleting the state 🤷‍♂️');
  }
  return ctx.reply('You have exited edit mode!', Extra.markup(Markup.removeKeyboard()));
};
