const Discord = require('discord.js');
const package = require("../package.json");

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Puyobot version " + package.version)
     .setColor(0x215F88)
     .setDescription("Changes made: Patch update")
     .addField("Updated the chainsim tool","Fixed up a regular expression so command doesn't go out of bounds", false)
     .addField("patched up warn command", "Gave more information on the warning as to who the user actually is",false)
     .setFooter("Puyobot ver. " + package.version + " made by Nostalgia Ninja");
  message.channel.send(em);
}
