const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("http://imgur.com/tf1Ycna.jpg");
  message.channel.send(em);
}
