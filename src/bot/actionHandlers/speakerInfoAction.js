const { Extra } = require('telegraf');
const { getSpeaker } = require('../../database/wrappers/speaker');

module.exports = async (ctx) => {
  const messageId = ctx.update.callback_query.message.message_id;
  const { speakerId } = JSON.parse(ctx.match.input);
  const currentSpeaker = await getSpeaker(speakerId);

  await ctx.deleteMessage(messageId);

  if (currentSpeaker) {
    const fullName = `${currentSpeaker.firstName} ${currentSpeaker.lastName}`;
    const speakerInfo = `Name: ${fullName}
    Company: ${currentSpeaker.company}
    Country:${currentSpeaker.country}`;

    await ctx.replyWithPhoto(
      currentSpeaker.image,
      Extra.caption(speakerInfo).markdown()
    );
  } else {
    ctx.reply('Sorry, something went wrong 🤷‍♂️');
  }
};
