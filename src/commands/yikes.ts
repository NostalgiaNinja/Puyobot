import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');
import Discord from 'discord.js';

export default {
  name: 'yikes',
  description: 'A yikes counter',
  args: true,
  category: 'fun',
  execute(message: Discord.Message, args: string[]): void {
    //initialize variables for command

    let yikesreset = args[0]; //initialize to nothing so that arguments can be allowed
    const em = new Discord.RichEmbed();
    let yikes = 0;
    db.get(`SELECT * FROM yike WHERE serverID = ${message.guild.id}`, function(err, row): void {
      if (!row) {
        db.run(`INSERT INTO yike VALUES (?, ?)`, message.guild.id, 0);
        message.channel.send(`This is the first time the yike counter has been ordered on this server.  Yikes will be counted now.`);
      } else {
        if (yikesreset == 'reset') {
          if (!message.member.hasPermission('MANAGE_ROLES')) return;
          yikes = 0;
          db.run(`UPDATE yike SET yikecount = ${yikes} WHERE serverID = ${message.guild.id}`);

          em.setTitle('Yikes counter reset!')
            .setColor(0x1887d2)
            .setDescription('The Yikes counter has been reset for this server.');
        } else {
          yikes = row.yikecount + 1;
          db.run(`UPDATE yike SET yikecount = ${yikes} WHERE serverID = ${message.guild.id}`);

          em.setTitle('Yikes!')
            .setColor(0xf9a704)
            .setDescription('The yikes count is now ' + yikes);
        }
        message.channel.send(em);
      }
    });
  },
};
