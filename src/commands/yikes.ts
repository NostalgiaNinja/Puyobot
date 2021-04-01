import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');
import Discord from 'discord.js';

export default {
  name: 'yikes',
  description: 'A yikes counter',
  args: true,
  category: 'fun',
  usage: ['<reset(mod only)> <reset amount(mod only)> - all params optional.'],
  execute(message: Discord.Message, args: string[]): void {
    //initialize variables for command
    if (message.channel.type === 'dm') {
      const em = new Discord.RichEmbed();

      em.setTitle('Yikes!')
        .setDescription('Since this was done in DMs, there will not be a counter for the command.')
        .setFooter('With love, Nostalgia Ninja');

      message.channel.send(em);
      return;
    }

    let yikesreset = args[0]; //initialize to nothing so that arguments can be allowed
    let yikescount = args[1]; //initialize to nothing, if no argument, then 0, if argument, then amount.
    const em = new Discord.RichEmbed();
    let yikes = 0 as number;
    db.get(`SELECT * FROM yike WHERE serverID = ${message.guild.id}`, function(err, row): void {
      if (!row) {
        db.run(`INSERT INTO yike VALUES (?, ?)`, message.guild.id, 0);
        message.channel.send(`This is the first time the yike counter has been ordered on this server.  Yikes will be counted now.`);
      } else {
        if (yikesreset == 'reset') {
          if (!message.member.hasPermission('MANAGE_ROLES')) return;
           
          if (!yikescount) 
            yikes = 0;
          else
          {
            yikes = Number(yikescount);
          }
          //sanity check - see if yikes is NaN.  Fail if so.
          if (isNaN(yikes))
          {
            message.channel.send("Error: The Yikes Reset number is not a number, so the reset cannot proceed.");
            return;
          }
          
          db.run(`UPDATE yike SET yikecount = ${yikes} WHERE serverID = ${message.guild.id}`);

          em.setTitle('Yikes counter reset!')
            .setColor(0x1887d2)
            .setDescription(`The Yikes counter has been reset for this server. it should now be ${yikes}`);
        } 
        else {
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
