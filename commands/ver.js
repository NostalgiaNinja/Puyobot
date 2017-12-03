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
     .addField("Minor Update: Cleaned up database initialization errors.", "- MessageDelete event handler got fixed to prevent sending unhandled promise rejections.\n\n- setupserver got a few updates to sanitize incorrect handling of commands.\n\n- getids issue fixed where it would always return instead of doing what was necessary.")
     .setFooter("Puyobot ver. " + package.version + " made by Nostalgia Ninja");
  message.channel.send(em);
}
