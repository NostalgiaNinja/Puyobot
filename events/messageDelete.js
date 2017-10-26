//delete message handler - fires when a message is deleted, and then returns what got deleted.

const Discord = require('discord.js'); //need the discord.js constant so that we can create richEmbeds

exports.run = (client, message) =>
{
  const config = require("../config.json"); //grab the config.json file for moderationChannel.

  em = new Discord.RichEmbed(); //create a new rich embed.
  em.setTitle("Message Deleted")
    .addField("Message Author", message.author.username, true)
    .addField("Message created at", message.createdAt, true)
    .addField("Message content:", message.toString(), false)
    .addField("Channel Name:", message.channel.name, false)
    .setColor(0x59AFEF)
    .setFooter("Message deleted at " + new Date());

  client.channels.get(config.moderationChannel).send(em).catch(console.error);
}
