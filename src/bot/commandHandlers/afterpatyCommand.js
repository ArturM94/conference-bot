import logger from '../../helpers/logger';

export default (ctx) => {
  try {
    ctx.telegram.sendVenue(
      ctx.update.message.from.id,
      '-75.980191',
      '21.921727',
      'Conference venue and time',
      '09:00  10.03.2020 \n end so on...'
    );
  } catch (error) {
    logger.error(error);
  }
};
