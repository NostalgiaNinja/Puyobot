exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("http://imgur.com/qeMQywX.gif");
  message.channel.send(em);
}
