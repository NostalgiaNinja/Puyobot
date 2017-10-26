const Discord = require('discord.js');
const package = require("../package.json");

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Puyobot version " + package.version)
     .setColor(0x215F88)
     .setDescription("Changes made:")
     .addField("Command Hanlder Update!", "Associates commands as separate files and fixes capitalization errors.")
     .addField("Added Moderation tools", "Added a small amount of moderation tools to suit server needs.")
     .setFooter("Puyobot ver. " + package.version + " made by Nostalgia Ninja");
  message.channel.send(em);
}
