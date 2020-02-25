import Scene from 'telegraf/scenes/base';

import { addImage } from '../../database/wrappers/image';
import upload from '../../helpers/uploadFile';
import logger from '../../helpers/logger';

const saveMemory = new Scene('savememory');

saveMemory.enter((ctx) => {
  ctx.reply('send your photo!');
});

saveMemory.on('photo', async (ctx) => {
  try {
    const imgUrl = await upload(
      ctx.update.message.photo.reverse()[0].file_id,
      ctx
    );
    await addImage(ctx.update.message.from.id, imgUrl);
    ctx.reply('image saved', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'exit',
              callback_data: '@exit',
            },
          ],
        ],
      },
    });
  } catch (error) {
    logger.error(error);
  }
});

saveMemory.on('callback_query', (ctx) => {
  if (ctx.update.callback_query.data === '@exit') ctx.scene.leave();
});

export default saveMemory;
