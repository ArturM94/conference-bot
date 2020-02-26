const { getSchedules } = require('../../database/wrappers/schedule');
const { getSpeaker } = require('../../database/wrappers/speaker');
const logger = require('../../helpers/logger');

const showSchedule = async (agenda) => {
  try {
    const temp = agenda.map(async (item) => {
      const speaker = await getSpeaker(item.speakerId);
      return `<i>${item.date}</i>   ${speaker.firstName} ${speaker.lastName}
              topic:  ${speaker.topic}
      ${item.details ? item.details : ' '}\n`;
    });
    return (await Promise.all(temp)).join('\n');
  } catch (error) {
    logger.error(error);
  }
};

module.exports = async (ctx) => {
  try {
    const schedule = await getSchedules();
    const technical = schedule.filter((item) => item.flow === 'technical');
    const nonTechnical = schedule.filter(
      (item) => item.flow === 'non-technical'
    );

    ctx.replyWithHTML(
      `<b>Conference schedule</b> \n     <pre>Technical</pre>\n${await showSchedule(
        technical
      )} \n     <pre><i>Not Technical</i></pre>\n${await showSchedule(
        nonTechnical
      )}`
    );
  } catch (error) {
    logger.error(error);
  }
};
