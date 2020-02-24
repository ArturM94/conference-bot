import { getSchedules } from '../../database/wrappers/schedule';
import { getSpeaker } from '../../database/wrappers/speaker';
import logger from '../../helpers/logger';

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

export default async (ctx) => {
  try {
    const schedule = await getSchedules();
    const technical = schedule.filter((item) => item.flow === 'technical');
    const nonTechnical = schedule.filter(
      (item) => item.flow === 'non-technical'
    );

    ctx.replyWithHTML(
      `<b>Conference schedule</b> \n     <b><i>Technical</i></b>\n${await showSchedule(
        technical
      )} \n     <b><i>Not Technical</i></b>\n${await showSchedule(
        nonTechnical
      )}`
    );
  } catch (error) {
    logger.error(error);
  }
};
