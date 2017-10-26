exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("http://imgur.com/7uneviX.gif");
  message.channel.send(em);  //NB: Embeds require you to use full filenames for it to work.
}
