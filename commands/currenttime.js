const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Current Bot Server Time (GMT+2.00 - South African Standard Time)")
    .setColor(0x00FF00)
    .setDescription(new Date()); //new date function gives times automatically
  message.channel.send(em);
  console.log('response from', message.author.username, 'sent: requested for current system date time on server');
}

/*TODO:
1) Add timezone arguments
2) parse timezones correctly.
*/ 
