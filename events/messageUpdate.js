//whenever a message is updated eg embed or content Changes

exports.run = (client, message, newMessage) =>
{
  try
  {
    const Discord = require('discord.js');

    const config = require("../config.json"); //grab the config.json file for moderationChannel.

    em = new Discord.RichEmbed();

    em.setTitle("Message Edited:")
      .addField("Old Message", message, false)
      .addField("New Message", newMessage, false)
      .addColor(0x59AFEF)
      .setFooter(new Date());

    client.channels.get(config.moderationChannel).send(em).catch(console.error);
  }
  catch (e)
  {
    console.error(e);
  }
}
