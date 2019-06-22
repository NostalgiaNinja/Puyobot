import Discord from 'discord.js';
import firebase from '../../../utility/firebase';

export default {
  name: 'organizer_role',
  description: 'Set the role for Tournament Organizers',
  aliases: [],
  category: ['League'],
  usage: ['.gg admin organizer_role [@role]'],
  execute(message: Discord.Message, args: string[]): void {
    if (args.length === 0) {
      message.reply('Insufficient parameters supplied.');
      return;
    }

    // -- Check if the supplied TO Role exists in the server.
    // Strip <@& .... > characters from role string.
    // /D/g - strip all non-numeric characters.
    const role = args[0].replace(/\D/g, '');
    if (message.guild.roles.has(role)) {
      firebase.db
        .collection('league')
        .doc('config')
        .set(
          {
            ORGANIZER_ROLE: {
              id: role,
              at: args[0],
              name: (<Discord.Role>message.guild.roles.get(role)).name,
            },
          },
          { merge: true },
        )
        .then((): void => {
          message.channel.send(`Set ${args[0]} as the TO role.`);
        });
    }
  },
};
