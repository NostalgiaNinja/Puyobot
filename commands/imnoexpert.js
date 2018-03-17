const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("https://i.imgur.com/3KaQ8g8.jpg");
  message.channel.send(em);
}
