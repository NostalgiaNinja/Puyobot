//whenever someone gets banned, this fires.

const Discord = require('discord.js');

exports.run = (client, Member, guild) =>
{
  //console.log(`banned ${user.username} (${user}) from the server`); //test data

  const config = require("../config.json");

  const em = new Discord.RichEmbed();
  em.setTitle("Member banned")
    .setDescription(`${member.user.username}:${member.user.discriminator} has been banished!`)
    .setColor(0xFF0000)
    .setFooter(new Date());

  client.channels.get(config.moderationChannel).send(em).catch(console.error);
}
