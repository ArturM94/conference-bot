const Telegraf = require('telegraf');
const Scene = require('telegraf/scenes/base');
const { Extra } = require('telegraf');

const { getScheduleBySpeaker } = require('../../database/wrappers/schedule');
const { getSpeakers } = require('../../database/wrappers/speaker');
const logger = require('../../helpers/logger');

// Function creates an inline keyboard from an object from the database
const createButtons = (dataArray) => {
  const markupKeyboard = Telegraf.Extra.markdown().markup((m) => {
    const list = [];
    dataArray.forEach((el) => {
      const fullName = `${el.firstName} ${el.lastName}`;
      list.push([
        // eslint-disable-next-line no-underscore-dangle
        m.callbackButton(fullName, JSON.stringify({ speakerId: el._id })),
      ]);
    });
    return m.inlineKeyboard(list);
  });
  return markupKeyboard;
};

const speakersScene = new Scene('speakers');

// "/speakers" command handler
speakersScene.enter(async (ctx) => {
  const allSpeakers = await getSpeakers();
  await ctx.reply(
    'All Our Speakers:',
    createButtons(allSpeakers),
  );
});

speakersScene.action(/speakerId/, async (ctx) => {
  const messageId = ctx.update.callback_query.message.message_id;
  const { speakerId } = JSON.parse(ctx.match.input);

  const schedule = await getScheduleBySpeaker(speakerId);
  const currentSpeaker = schedule[0].speakerId;
  await ctx.deleteMessage(messageId);

  if (currentSpeaker) {
    const fullName = `${currentSpeaker.firstName} ${currentSpeaker.lastName}`;
    const speakerInfo = `Name: ${fullName}
    Position: ${currentSpeaker.position}
    Company: ${currentSpeaker.company}
    Country: ${currentSpeaker.country}
    Scene: ${schedule[0].flow}
    `;

    await ctx.replyWithPhoto(
      currentSpeaker.image,
      Extra.caption(speakerInfo).markdown(),
    );
  } else {
    ctx.reply('Sorry, something went wrong 🤷‍♂️');
    logger.error('Speaker Object is Empty! SpeakersHandler.js');
  }
});

module.exports = speakersScene;
