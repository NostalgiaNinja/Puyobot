const Discord = require('discord.js');
const package = require("../package.json");

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Puyobot version " + package.version)
     .setColor(0x215F88)
     .setDescription("Changes made:")
     .addField("Multi-Server handling update!", "Now multiple servers can use what was previously static in config.json.")
     .addField("Server administration tools", "If a member has MANAGE_ROLES permissions, they can manage the bot's server administration objects.")
     .addField("small bugfixes and debugging tools.", "This allows for easier use of server administration tools.")
     .setFooter("Puyobot ver. " + package.version + " made by Nostalgia Ninja");
  message.channel.send(em);
}
