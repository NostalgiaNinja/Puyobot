const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Rule 5:")
    .setColor(0xFF0000)
    .setDescription("**Repost artwork with a link to original source.** If the art is not yours, a link source must be given. If you cannot find a source, do not repost! If an artist requires permission to repost, ask! For a full guide on how to source, get permission for reposting, templates for asking permission from non-English speakers, and what to do in the event you are/are not given permission, please refer to this document: https://docs.google.com/document/d/1XLchLr0S7WUNNet8LLHSS7eVqvcj1PI2cg47jtKuZqM/edit");
  message.channel.send(em);
}
