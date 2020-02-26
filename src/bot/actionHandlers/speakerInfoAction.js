import { Extra } from 'telegraf';

import { getScheduleBySpeaker } from '../../database/wrappers/schedule';

export default async (ctx) => {
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
    Scene: ${schedule.flow}
    `;

    await ctx.replyWithPhoto(
      currentSpeaker.image,
      Extra.caption(speakerInfo).markdown(),
    );
  } else {
    ctx.reply('Sorry, something went wrong 🤷‍♂️');
  }
};
