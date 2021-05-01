import Discord from 'discord.js';

export default {
  name: 'setpresence',
  description: 'Provides administration the means to set a presence for the bot',
  args: true,
  usage: '[richpresence enum] [richpresence name]',
  category: 'Administration',
  aliases: ['sp'],
  execute(message: Discord.Message, args: string[], client: Discord.Client): void {
    if (message.author.id == process.env.BOTOWNERID) {
      {
        const richpresence = parseInt(args[0], 10);
        const gamename = args.slice(1).join(' ');

        if (!(richpresence >= 0 && richpresence <= 3)) {
          message.channel.send('Invalid presence mode - please look up ActivityType in DiscordJS.');
        }

        try {
          if (richpresence >= 0 && richpresence <= 3) {
            let rpvalue = '';
            if (richpresence == 0) {
              rpvalue = 'PLAYING';
            } else if (richpresence == 1) {
              rpvalue = 'STREAMING';
            } else if (richpresence == 2) {
              rpvalue = 'LISTENING';
            } else {
              rpvalue = 'WATCHING';
            }

            const em = new Discord.MessageEmbed();

            em.setTitle('Success!');
            em.addField('User Presence set to: ', rpvalue);
            em.addField('Set game name to: ', gamename);

            client.user?.setPresence({ activity: { name: gamename, type: rpvalue as 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING' }, status: 'online' }); // setting user presence!
            message.channel.send(em);
          } else {
            message.channel.send(`\`Syntax: ${process.env.PREFIX}setpresence [richpresence enum] [game]\` \n where richpresence = 0, 1, 2, 3 `);
          }
        } catch (e) {
          message.channel.send('something went wrong: ' + e);
        }
      }
    } else {
      message.channel.send('command intended for bot owner use only!');
      return;
    }
  },
};
