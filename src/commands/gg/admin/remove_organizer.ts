import Discord from 'discord.js';
import { getOrganizers, getOrganizerRole, setOrganizers } from '../../../utility/firebase';

export default {
  name: 'remove_organizer',
  description: 'Remove a user from the list of tournament organizers.',
  aliases: [],
  category: ['League'],
  usage: ['.gg admin remove_organizer [@user]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    if (args.length === 0) {
      message.reply('Insufficient parameters supplied.');
      return;
    }

    const USER = args[0];
    const USER_ID = USER.replace(/\D/g, '');

    // Check if user is a valid user in the server.
    if (!message.guild.members.has(USER_ID)) {
      message.reply('Error: You tried to remove an invalid user.');
      return;
    }

    // Get current list of organizers
    const ORGANIZERS = await getOrganizers();
    const ORGANIZER_ROLE = await getOrganizerRole();

    if (!ORGANIZERS) {
      message.channel.send('Error: Tournament organizers have not been configured in the database.');
      return;
    }

    if (!ORGANIZER_ROLE) {
      message.channel.send('Error: The organizer role has not been configured in the database.');
      return;
    }

    // Remove requested user from the list of tournament organizers.
    const removalIndex = ORGANIZERS.map((user): string => user.ID).indexOf(USER_ID);
    if (removalIndex === -1) {
      message.reply(`${USER} is not a tournament organizer.`);
      return;
    } else {
      ORGANIZERS.splice(removalIndex, 1);
      (<Discord.GuildMember>message.guild.members.get(USER_ID)).removeRole(ORGANIZER_ROLE);

      setOrganizers(ORGANIZERS)
        .then((): void => {
          message.channel.send(`Successfully removed ${USER} as a tournament organizer.`);
          return;
        })
        .catch((err): void => {
          console.error(err);
          message.reply(`There was an error trying to remove ${USER} as a tournament organizer.`);
        });
    }
  },
};
