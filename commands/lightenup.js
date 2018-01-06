const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("https://imgur.com/16JpwSp.jpg");
  message.channel.send(em);
  console.log('response from', message.author.username, 'sent: [screams internally]!');
}
