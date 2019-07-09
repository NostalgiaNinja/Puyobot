import Discord from 'discord.js';
import { getOrganizers, getOrganizerRole, setOrganizers } from '../../../utility/firebase';

export default {
  name: 'add_organizer',
  description: 'Add user as tournament organizer.',
  aliases: [],
  category: ['League'],
  usage: ['.gg admin add_organizer [@user]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    if (args.length === 0) {
      message.reply('Insufficient parameters supplied.');
      return;
    }

    const USER = args[0];
    const USER_ID = USER.replace(/\D/g, '');

    // Check if user is a valid user in the server.
    if (!message.guild.members.has(USER_ID)) {
      message.reply('Error: You tried to give an invalid user the organizer role.');
    }

    const USER_NAME = (<Discord.GuildMember>message.guild.members.get(USER_ID)).displayName;

    // Get current list of organizers and the organizer role
    const ORGANIZERS = await getOrganizers();
    const ORGANIZER_ROLE = await getOrganizerRole();

    if (!ORGANIZER_ROLE) {
      message.reply('Error: You need to set the organizer role first with ".gg admin organizer_role"');
      return;
    }

    // Add the requested user to the list of tournament organizers
    if (ORGANIZERS && ORGANIZERS.some((organizer): boolean => organizer.ID === USER_ID)) {
      message.reply(`${USER} is already a tournament organizer.`);
      return;
    } else {
      let oldArray = ORGANIZERS ? [...ORGANIZERS] : [];
      const newOrganizersArray = [
        ...oldArray,
        {
          ID: USER_ID,
          AT: USER,
          NAME: USER_NAME,
        },
      ];

      setOrganizers(newOrganizersArray)
        .then((): void => {
          (<Discord.GuildMember>message.guild.members.get(USER_ID)).addRole(ORGANIZER_ROLE);
          message.channel.send(`${USER} was successfully added as a tournament organizer.`);
        })
        .catch((err: Error): void => {
          console.error(err);
          message.reply(`There was an error trying to add ${USER} as a tournament organizer.`);
        });
    }
  },
};
