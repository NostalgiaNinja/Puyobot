import Discord from 'discord.js';
import { configRef, getOrganizers, setSeason } from '../../utility/firebase';
import { ChannelRefs, LeagueConfig } from '../../@types/league';

export default {
  name: 'set_season',
  description: 'Set the current league season.',
  aliases: [],
  category: ['League'],
  usage: ['.gg admin set_season'],
  async execute(message: Discord.Message, args: string[], client: Discord.Client): Promise<void> {
    // Check if the current user the current user is a tournament organizer
    const USER = message.author.id;
    const ORGANIZERS = await getOrganizers();

    if (!ORGANIZERS) {
      message.reply('Error: Tournament organizers have not been set in the database.');
      return;
    }

    if (!ORGANIZERS.some((ORGANIZER): boolean => ORGANIZER.ID === USER)) {
      message.reply("Error: You can't use this command because you're not a tournament organizer.");
      return;
    }

    // Check if sufficient arguments were supplied.
    if (args.length === 0) {
      message.reply('Error: The name of the new season was not supplied as a parameter.');
      return;
    }

    // Get the id of the verification channel.
    const VERIFICATION_CHANNEL = await configRef.get().then((doc): ChannelRefs | null => {
      const data = <LeagueConfig>doc.data();
      if (data && data.VERIFICATION_CHANNEL) {
        return data.VERIFICATION_CHANNEL;
      } else {
        return null;
      }
    });

    if (!VERIFICATION_CHANNEL) {
      console.log('A channel for command verification has not been set yet.');
      return;
    }

    // Send a message to the verification channel.
    const discordChannel = <Discord.TextChannel | undefined>client.channels.get(VERIFICATION_CHANNEL.ID);
    if (!discordChannel) {
      console.log('Couldn\t find the verification channel.');
      return;
    }
    const verifMsg = <Discord.Message>await discordChannel.send(`<@${message.author.id}>: The current season will be changed to "${args[0]}". Are you sure?`);

    // Append confirm / cancel emojis
    verifMsg.react('✅').then((): Promise<Discord.MessageReaction> => verifMsg.react('❌'));

    // -- Add a reaction collector.
    // First, make sure the user reacting is a tournament organizer.
    const filter = (reaction: Discord.MessageReaction, user: Discord.User): boolean => {
      const validEmojis = ['✅', '❌'].some((emoji): boolean => emoji === reaction.emoji.name);
      const validUser = ORGANIZERS.some((ORGANIZER): boolean => ORGANIZER.ID === user.id);
      return validEmojis && validUser;
    };

    const collector = verifMsg.createReactionCollector(filter);

    collector.on('collect', (reaction: Discord.MessageReaction): void => {
      collector.stop();
      if (reaction.emoji.name === '✅') {
        setSeason(args[0], client);
      } else {
        discordChannel.send('Canceled the season change request.');
      }
    });
  },
};
