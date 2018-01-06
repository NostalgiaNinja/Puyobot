const Discord = require('discord.js');
const package = require("../package.json");

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Puyobot version " + package.version)
     .setColor(0x215F88)
     .setDescription("Changes made:")
     .addField("Current time now accepts timezone parsing!", "Now you can use current time to show the current time in a certain timezone.  invalid timezones will default to GMT.")
     .addField("Lighten Up command thanks to Suzu", "as per request :).")
     .addField("Poihammer integrated into help.", "minor update to help to show commands which need higher privledges to set data.")
     .setFooter("Puyobot ver. " + package.version + " made by Nostalgia Ninja");
  message.channel.send(em);
}
