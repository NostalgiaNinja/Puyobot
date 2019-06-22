import Discord from 'discord.js';
import { configRef } from '../../../utility/firebase';
import { UserRefs } from '../../../@types/league';

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

    const USER_NAME = (<Discord.GuildMember>message.guild.members.get(USER_ID)).nickname;

    // Get current list of organizers and the organizer role
    const organizers = await configRef.get().then((doc): UserRefs[] => {
      const data = doc.data();
      if (data) {
        return <UserRefs[]>data.organizers;
      } else {
        return [];
      }
    });
    const ORGANIZER_ROLE = await configRef.get().then((doc): string | null => {
      const data = doc.data();
      if (data) {
        return <string>data.TO_ROLE.id;
      } else {
        return null;
      }
    });

    if (!ORGANIZER_ROLE) {
      message.reply('Error: You need to set the organizer role first with ".gg admin organizer_role"');
      return;
    }

    // Add the requested user to the list of tournament organizers
    if (organizers.some((organizer): boolean => organizer.id === USER_ID)) {
      message.reply(`${USER} is already a tournament organizer.`);
      return;
    } else {
      const newOrganizersArray = [
        ...organizers,
        {
          id: USER_ID,
          at: USER,
          name: USER_NAME,
        },
      ];

      configRef
        .set({ organizers: newOrganizersArray }, { merge: true })
        .then((): void => {
          (<Discord.GuildMember>message.guild.members.get(USER_ID)).addRole(ORGANIZER_ROLE);
          message.channel.send(`${USER} was successfully added as a tournament organizer.`);
        })
        .catch((err): void => {
          console.error(err);
          message.reply(`There was an error trying to add ${USER} as a tournament organizer.`);
        });
    }
  },
};
