const logger = require('../../helpers/logger');

module.exports = (ctx) => {
  try {
    ctx.telegram.sendVenue(
      ctx.update.message.from.id,
      '49.848084',
      '24.0208729',
      'Conference venue and time',
      '10:00  10.03.2020',
    );
  } catch (error) {
    logger.error(error);
  }
};
