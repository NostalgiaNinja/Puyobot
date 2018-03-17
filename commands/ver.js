const Discord = require('discord.js');
const package = require("../package.json");

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Puyobot version " + package.version)
     .setColor(0x215F88)
     .setDescription("Changes made:")
     .addField("Current time minor patch", "needs fixing so I've prepped it for patching.")
     .addField("SetPresence now takes place of SetGame", "Updated to the new Presence system")
     .addField("Added reload method", "Can now reload commands without needing to reset the system")
     .addField("added a buffer to a moderation event", "Attachments that are deleted no longer throw errors.")
     .addField("Added the DB folder", "No more needing to create a db folder yourself")
     .setFooter("Puyobot ver. " + package.version + " made by Nostalgia Ninja");
  message.channel.send(em);
}
