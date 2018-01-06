const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("https://imgur.com/ZaF0cac.jpg");
  message.channel.send(em);
  console.log('response from', message.author.username, 'sent: [screams internally]!');
}
