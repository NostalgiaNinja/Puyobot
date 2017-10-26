exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("http://imgur.com/6mBanRD.jpg")
  message.channel.send(em);
}
