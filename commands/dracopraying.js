exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setImage("http://imgur.com/w4FeIqZ.png");
  message.channel.send(em);
}
