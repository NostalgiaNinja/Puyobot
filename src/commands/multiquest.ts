import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./data/sqlite.db');

export default {
  name: 'multiquest',
  description: 'Provides Puyo Puyo!! Quest Players the command to open up multiplayer quests.',
  args: true,
  usage: '<Room Code> <Quest Access> <Quest Title - Optional>',
  category: 'PPQ',
  aliases: ['mq'],
  execute(message: Discord.Message, args: string[]): void {
    try {
      const em = new Discord.RichEmbed();

      const roomcode = args[0];
      const roomaccess = args[1];
      const roomname = args.slice(2).join(' ');
      const roomparser = roomname.toLowerCase();

      // set up the richEmbed values beforehand: no needing to mess with room access values any longer
      em.setTitle('A Multiplayer Quest room has opened!');

      // check if room name exists
      if (roomname) {
        // if room access not LINE, allow the room name to show
        if (roomaccess != 'LINE') {
          em.addField('Room Name', roomname, false);
        }
      }
      // Check if possible to add a roomaccess default value

      // new fancy switch... case statements to make room access easier to determine.
      switch (roomaccess) {
        case '1':
          em.addField('Room Access:', 'Open to Public', true);
          em.setColor(0x004080);
          break;

        case '2':
          em.addField('Room Access:', 'Open to Guild', true);
          em.setColor(0x00ff00);
          break;

        case '3':
          em.addField('Room Access:', 'Code Only', true);
          em.setColor(0xff0000);
          break;

        case 'LINE':
          em.addField('Room Access:', 'LINE Stone Linkage', true);
          em.setColor(0x59afef);
          break;

        default:
          em.addField('Room Access', 'Code Only (unspecified)');
          em.setColor(0x59afef);
          break;
      }

      // Checks the 6 digit code for standard case-by-case basis
      const testRegex = /^\d{6}$/;
      if (testRegex.test(roomcode) == false) {
        message.channel.send('room code invalid! Exiting!');
        return;
      }

      em.addField('Room Code', roomcode, true);

      // if the room is LINE linked, then show this
      if (roomaccess == 'LINE') {
        const testRegexUID = /^\d{8}$/;
        if (testRegexUID.test(roomname) == false) {
          message.channel.send('User ID Invalid! Exiting!');
          return;
        }

        const PPQ_UID = roomname;
        em.addField('TAPI Link:', 'https://tapi.puyoquest.jp/multi/redirect/?room_no=' + roomcode + '&invite_display_person_id=' + PPQ_UID, false);
      }

      // else show this
      else {
        em.addField('TAPI link:', 'https://tapi.puyoquest.jp/multi/redirect/?room_no=' + roomcode, false);
      }

      em.setFooter('Room Opened by ' + message.author.username);

      // DB GRABBING STUFF FOR ROOMPARSER/URLPARSER
      db.all(`SELECT * FROM charaicon`, function(err,row) {

        row.forEach(function(row) {
          if (roomparser.includes(row.character) === true) {
            em.setThumbnail(`${row.urlcode}`);
          }
        });
        message.channel.send(em);
      });

      // ----------------------------------------------------------------------------------------//
			//              THUMBNAIL DATA      
      // ----------------------------------------------------------------------------------------//

      if ((roomparser.includes('green') === true)) {
				em.setThumbnail('https://cdn.discordapp.com/emojis/429944006948945931.png');
			}
			else if ((roomparser.includes('blue') === true)) {
				em.setThumbnail('https://cdn.discordapp.com/emojis/429944006601080849.png');
			}
			else if ((roomparser.includes('red') === true)) {
				em.setThumbnail('https://cdn.discordapp.com/emojis/429944006135382017.png');
			}
			else if ((roomparser.includes('yellow') === true)) {
				em.setThumbnail('https://cdn.discordapp.com/emojis/429944006718521345.png');
			}
			else if ((roomparser.includes('purple') === true)) {
				em.setThumbnail('https://cdn.discordapp.com/emojis/429944007397736448.png');
      }
      
      // ----------------------------------------------------------------------------------------//
			//          END OF THUMBNAIL DATA FOR EVENT QUESTS
			// ----------------------------------------------------------------------------------------//

			else {
				em.setThumbnail('https://cdn.discordapp.com/emojis/429944006948945931.png');
			}

			// ----------------------------------------------------------------------------------------//
			//          END THUMBNAIL DATA
			// ----------------------------------------------------------------------------------------//

    } catch (e) {
      console.log(e);
    }
  },
};
