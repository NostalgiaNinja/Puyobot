import Discord from 'discord.js';
import { getOrganizerRole, getSeasonName, getSeasonRef } from '../../utility/firebase';

export default {
  name: 'register',
  description: 'puyo.gg League Commands',
  aliases: [],
  category: ['League'],
  usage: ['.gg register [@user?]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    let userToRegister: string;

    if (!args[0]) {
      // If no arguments are supplied, assume the message sender is trying to register themselves.
      userToRegister = message.author.id;
    } else {
      // If arguments ARE supplied, then first check if the message sender is an organizer.
      // Only organizers are allowed to register people other than themselves.
      const ORGANIZER_ROLE = await getOrganizerRole();
      if (!ORGANIZER_ROLE) {
        message.reply('Error: The was a problem in checking whether you have the Tournament Organizer role.');
        return;
      }

      if (message.member.roles.has(ORGANIZER_ROLE)) {
        userToRegister = args[0].replace(/\D/g, '');

        // Make sure the given user is a valid user in the server.
        if (!message.guild.members.has(userToRegister)) {
          message.reply('Error: You tried to register an invalid user.');
          return;
        }
      } else {
        message.reply("Error: You can't register other users unless you're a Tournament Organizer.");
        return;
      }
    }

    // -- Check if the userToRegister is already a player in the current season.
    // Get the current season.
    const CURRENT_SEASON = await getSeasonName();
    if (!CURRENT_SEASON) {
      message.reply('Erorr: There was a problem getting the current league season.');
      return;
    }

    const seasonRef = getSeasonRef(CURRENT_SEASON);
    const playersRef = seasonRef.doc('players').collection('players');
    const playerList = (await playersRef.listDocuments()).map((doc): string => doc.id);
    if (playerList.some((player): boolean => player === userToRegister)) {
      message.reply(`The requested user <@${userToRegister}> already exists as a player this season.`);
      return;
    } else {
      const member = <Discord.GuildMember>message.guild.members.get(userToRegister);

      const userData = {
        ID: userToRegister,
        AVATAR: member.user.avatarURL,
        AT: `<@${userToRegister}>`,
        TAG: member.user.tag,
        USERNAME: member.user.username,
        CREATED_TIMESTAMP: message.author.createdTimestamp,
        CURRENT_RATING: 2000,
        MATCH_HISTORY: {},
      };

      playersRef
        .doc(userToRegister)
        .set(userData)
        .then((): void => {
          message.reply(`Successfully added <@${userToRegister}> to the database as a player.`);
        });
    }
  },
};
