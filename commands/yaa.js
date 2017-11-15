const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("https://imgur.com/gLgHsmo.png");
  message.channel.send(em);
}
