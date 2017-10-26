const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("http://imgur.com/LdrIBUY.jpg");
  message.channel.send(em);
  console.log('response from', message.author.username, 'sent: [screams internally]!');
}
