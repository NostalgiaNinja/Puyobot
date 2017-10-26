const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Rule 1:")
    .setColor(0xFF0000)
    .setDescription("**Moderation is done at our discretion.** That means you could very well be moderated for something that someone else wasn't. This is not an excuse to violate the rules. That being said, we are not able to monitor every message sent on the server, so please report inappropriate behavior if you see it. We're here to help, so don't be afraid to come to us.\n\n**How to report an issue:** \n**Pinging:** You can request immediate attention to a problem currently happening in any of our channels by pinging the **@Moderators** role. We advise pinging this role as a whole, so in the event that a specific Admin or Moderator isn’t available at the time, others may be able to handle it. \n**DMing**: For situations that require discretion, or can be handled over time, DMing is a better method. You are free to message any Admin or Moderator with your concerns, but please refrain from messaging all of us. We will help you as soon as we are able to!");
  message.channel.send(em);
}
