exports.run =   (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("http://imgur.com/Kl61MLn.gif");
  message.channel.send(em);
}
