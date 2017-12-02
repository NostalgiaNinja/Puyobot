//delete message handler - fires when a message is deleted, and then returns what got deleted.

const Discord = require('discord.js'); //need the discord.js constant so that we can create richEmbeds
const sql = require('sqlite'); //need the sqlite constant so we can grab ModerationChannel

exports.run = (client, message) =>
{
  try
  {
    sql.get(`SELECT * FROM server WHERE serverID = '${message.guild.id}'`).then(row =>
    {

      if (!row) return;

      em = new Discord.RichEmbed(); //create a new rich embed.
      em.setTitle("Message Deleted")
        .addField("Message Author", message.author.username, true)
        .addField("Message created at", message.createdAt, true)
        .addField("Message content:", message.content, false)
        .addField("Channel Name:", message.channel.name, false)
        .setColor(0x59AFEF)
        .setFooter("Message deleted at " + new Date());

      client.channels.get(row.moderationChannel).send(em).catch(console.error);

    });
  }
  catch (e)
  {
    console.error(e);
  }
}
