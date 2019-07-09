import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');
import Discord from 'discord.js';

export default {
  name: 'yikes',
  description: 'A yikes counter',
  args: false,
  usage: '',
  category: 'fun',
  execute(message: Discord.Message): void {
    //initialize variables for command

    const em = new Discord.RichEmbed();
    let yikes = 0;
    db.get(`SELECT * FROM yike WHERE serverID = ${message.guild.id}`, function(err, row): void {
      if (!row) {
        db.run(`INSERT INTO yike VALUES (?, ?)`, message.guild.id, 0);
        message.channel.send(`This is the first time the yike counter has been ordered on this server.  Yikes will be counted now.`);
      } else {
        yikes = row.yikecount + 1;
        db.run(`UPDATE yike SET yikecount = ${yikes} WHERE serverID = ${message.guild.id}`);

        em.setTitle('Yikes!')
          .setColor(0xf9a704)
          .setDescription('A yike has been ordered. The yikes count is now ' + yikes);

        message.channel.send(em);
      }
    });
  },
};
