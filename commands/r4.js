const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Rule 4:")
    .setColor(0xFF0000)
    .setDescription("**Do not link to pirated material or discussions about where to pirate material.** Discussion about piracy, such as in the context of game emulation, is allowed. ");
  message.channel.send(em);
}
