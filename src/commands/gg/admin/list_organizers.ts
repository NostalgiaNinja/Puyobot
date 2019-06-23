import Discord from 'discord.js';
import { getOrganizers } from '../../../utility/firebase';

export default {
  name: 'list_organizers',
  description: 'List the current tournament organizers.',
  aliases: [],
  category: ['League'],
  usage: ['.gg admin list_organizers'],
  async execute(message: Discord.Message): Promise<void> {
    const ORGANIZERS = await getOrganizers();

    if (!ORGANIZERS) {
      message.channel.send('Error: Tournament organizers have not been configured in the database.');
      return;
    }

    const organizerString = ORGANIZERS.map((organizer): string => organizer.at).join(', ');

    message.channel.send(`The current Tournament Organizers are: ${organizerString}.`);
  },
};
