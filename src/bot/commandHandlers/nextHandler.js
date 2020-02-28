
const Telegraf = require('telegraf');
const Scene = require('telegraf/scenes/base');
// const validator = require('validator');

const { getScheduleByStartTime, getScheduleByEndTime, getScheduleBySpeaker } = require('../../database/wrappers/schedule');
const { getSpeakers } = require('../../database/wrappers/speaker');
const logger = require('../../helpers/logger');

// Function creates an inline keyboard from an object from the database
const createButtons = (dataArray) => {
  const markupKeyboard = Telegraf.Extra.markdown().markup((m) => {
    const list = [];
    for (let i = 0; i <= 1; i += 1) {
      const el = dataArray[i];
      const fullName = `${el.firstName} ${el.lastName} `;
      // eslint-disable-next-line no-underscore-dangle
      list.push([m.callbackButton(fullName, JSON.stringify({ speakerId: dataArray._id }))]);
    }
    return m.inlineKeyboard(list);
  });
  return markupKeyboard;
};

const getTime = () => {
  const time = new Date();
  return `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDay()}T${time.getHours()}:${time.getMinutes()}`;
};

const timeToNumber = (timeString) => {
  const hm = timeString.split(':');
  const hours = Number(hm[0]);
  return hours * 100 + Number(hm[1]);
};

// eslint-disable-next-line arrow-body-style
const timeCompareNext = (ref, min, max) => {
  return (timeToNumber(min) >= timeToNumber(ref)) && (timeToNumber(ref) <= timeToNumber(max));
};

const nextSpeakerScene = new Scene('next');

// "/now" command handler
nextSpeakerScene.enter(async (ctx) => {
  const speackers = await getSpeakers();
  const currentTime = getTime();
  // format 'startTime' and 'endTime' is '14:00'
  let startTime = await getScheduleByStartTime(currentTime);
  startTime = startTime.join('');
  let endTime = await getScheduleByEndTime(currentTime);
  endTime = endTime.join('');

  if (timeCompareNext(currentTime, startTime, endTime) === true) {
    await ctx.reply(
      'Our all speackers:',
      createButtons(speackers),
    );
  } else {
    ctx.reply(
      'Something went wrong, maybe there are not speakers at the moment',
      logger.error('Maybe is problem with database'),
    );
  }
});

nextSpeakerScene.action(/speakerId/, async (ctx) => {
  const messageId = ctx.update.callback_query.message.message_id;
  const { speakerId } = JSON.parse(ctx.match.input);

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
  } else {
    ctx.reply('Sorry, something went wrong 🤷‍♂️');
    logger.error('Speaker Object is Empty! SpeakersHandler.js');
  }
});

module.exports = nextSpeakerScene;
