const { getScheduleBySpeaker } = require('../../database/wrappers/schedule');
const logger = require('../../helpers/logger');

const {
  updateUser,
  getUserByChatId,
} = require('../../database/wrappers/user');

module.exports = async (ctx) => {
  const userChatId = ctx.chat.id;

  const callbackQuery = ctx.update.callback_query;
  const messageId = callbackQuery.message.message_id;
  const { speakerId } = JSON.parse(callbackQuery.data);

  const schedule = await getScheduleBySpeaker(speakerId);
  const currentSpeaker = schedule[0].speakerId;
  await ctx.deleteMessage(messageId);

  if (currentSpeaker) {
    const fullName = `${currentSpeaker.firstName} ${currentSpeaker.lastName}`;
    const speakerInfo = `
<b><u>Name</u>:   <i>${fullName}</i></b>
<b><u>Position</u>:  <i>${currentSpeaker.position}</i></b>
<b><u>Company</u>:  <i>${currentSpeaker.company}</i></b>
<b><u>Country</u>:  <i>${currentSpeaker.country}</i></b>
<b><u>Scene</u>:  <i>${schedule[0].flow}</i></b>
    `;

    await ctx.replyWithPhoto(
      currentSpeaker.image,
      {
        caption: speakerInfo,
        parse_mode: 'HTML',
      },
    );

    const currentUser = await getUserByChatId(userChatId);
    // eslint-disable-next-line no-underscore-dangle
    const userId = currentUser._id;
    const updatedUser = await updateUser({
      id: userId,
      state: {},
    });
    if (updatedUser.error) {
      logger.error(`Error, User can't updated!\n${updatedUser.error}`);
      ctx.reply('Error, User can\'t updated');
    }
  } else {
    ctx.reply('Sorry, something went wrong 🤷‍♂️');
    logger.error('Speaker Object is Empty! SpeakersHandler.js');
  }
};
