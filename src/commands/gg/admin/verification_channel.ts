import Discord from 'discord.js';
import { configRef } from '../../../utility/firebase';

export default {
  name: 'verification_channel',
  description: 'Set the channel for the league verification system.',
  aliases: [],
  category: ['League'],
  usage: ['.gg admin verification_channel [#channel]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    if (args.length === 0) {
      message.reply('Insufficient parameters supplied.');
      return;
    }

    const CHANNEL_AT = args[0];
    const CHANNEL_ID = CHANNEL_AT.replace(/\D/g, '');

    // Check if the server has this channel.
    if (!message.guild.channels.has(CHANNEL_ID)) {
      message.reply('Error: You tried to set the verification channel to a channel that does not exist.');
      return;
    }

    const CHANNEL_NAME = (<Discord.GuildChannel>message.guild.channels.get(CHANNEL_ID)).name;
    configRef
      .set(
        {
          VERIFICATION_CHANNEL: {
            ID: CHANNEL_ID,
            AT: CHANNEL_AT,
            NAME: CHANNEL_NAME,
          },
        },
        { merge: true },
      )
      .then((): void => {
        message.channel.send(`Sucessfully added ${CHANNEL_NAME} as the verification channel.`);
      })
      .catch((err): void => {
        console.error(err);
        message.reply('There was an error trying to set the verification channel.');
      });
  },
};
