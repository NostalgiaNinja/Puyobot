const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("https://imgur.com/WrJmrmY.gif");
  message.channel.send(em);
}
