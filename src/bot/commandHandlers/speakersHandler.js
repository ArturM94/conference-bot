import Telegraf from 'telegraf';
import { getSpeakers } from '../../database/wrappers/speaker';

// Function creates an inline keyboard from an object from the database
const createButtons = (dataArray) => {
  const markupKeyboard = Telegraf.Extra.markdown().markup((m) => {
    const list = [];
    dataArray.forEach((el) => {
      const fullName = `${el.firstName} ${el.lastName}`;
      // eslint-disable-next-line no-underscore-dangle
      list.push([m.callbackButton(fullName, JSON.stringify({ speakerId: el._id }))]);
    });
    return m.inlineKeyboard(list);
  });
  return markupKeyboard;
};

// "/speakers" command handler
export default async (ctx) => {
  const speakers = await getSpeakers();
  await ctx.reply(
    'Our all speackers:',
    createButtons(speakers),
  );
};
