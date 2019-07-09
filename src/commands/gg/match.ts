import Discord from 'discord.js';
import { getSeasonName, getSeasonRef, getOrganizerRole } from '../../utility/firebase';
import { PlayerData } from '../../@types/league';

export default {
  name: 'match',
  description: 'puyo.gg League Commands',
  aliases: [],
  category: ['League'],
  usage: ['.gg match [p1] ##-## [p2] [video-link?]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    try {
      // Check if the message sender is a registered player or a TO
      const CURRENT_SEASON = await getSeasonName();
      if (!CURRENT_SEASON) {
        message.reply('Erorr: There was a problem getting the current league season.');
        return;
      }
      const seasonRef = getSeasonRef(CURRENT_SEASON);
      const playersRef = seasonRef.doc('players').collection('players');
      const playerList = (await playersRef.listDocuments()).map((doc): string => doc.id);
      const isPlayer = playerList.some((player): boolean => player === message.author.id);

      const ORGANIZER_ROLE = await getOrganizerRole();
      if (!ORGANIZER_ROLE) {
        message.reply('Error: The was a problem in checking whether you have the Tournament Organizer role.');
        return;
      }
      const isOrganizer = message.member.roles.has(ORGANIZER_ROLE);

      if (!(isPlayer || isOrganizer)) {
        message.reply('Error: You have to be a registered player or a tournament organizer to submit match results.');
        return;
      }

      // Check the number of arguments.
      if (args.length < 3) {
        message.reply('Insufficient parameters supplied.');
        return;
      } else if (args.length > 4) {
        message.reply('Too many parameters were supplied');
        return;
      }

      // Set players
      const p1 = args[0].replace(/\D/g, '');
      const p2 = args[2].replace(/\D/g, '');

      // Assign database references for each player
      const setDatabaseRef = (PLAYER_ID: string): FirebaseFirestore.DocumentReference => {
        const inDiscord = message.guild.members.has(PLAYER_ID);
        const inDatabase = playerList.some((player): boolean => player === PLAYER_ID);
        if (inDiscord && inDatabase) {
          return playersRef.doc(PLAYER_ID);
        } else {
          throw `<@${PLAYER_ID}> is not a valid player.`;
        }
      };

      const p1Ref = setDatabaseRef(p1);
      const p2Ref = setDatabaseRef(p2);

      // Parse the score string.
      const scoreSplit = args[1].split('-');
      if (scoreSplit.length !== 2) {
        throw 'You submitted an invalid score.';
      }

      scoreSplit.forEach((score): void => {
        if (!!score.match(/\D/g)) {
          throw 'You submitted score counts with non-numeric characters.';
        }
      });

      const [p1Score, p2Score] = scoreSplit.map((score): number => parseInt(score, 10));

      // Retrieve Player Data
      const p1Data = await p1Ref.get().then((doc): PlayerData | undefined => {
        return <PlayerData | undefined>doc.data();
      });
      const p2Data = await p2Ref.get().then((doc): PlayerData | undefined => {
        return <PlayerData | undefined>doc.data();
      });

      if (!p1Data) throw `There was a problem obtaining the user data for Player 1.`;
      if (!p2Data) throw 'There was a problem obtaining the user data for Player 2';
    } catch (error) {
      console.log('Error ' + error);
      message.channel.send('Error: ' + error);
    }
  },
};
