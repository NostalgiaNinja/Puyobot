const Discord = require('discord.js');

exports.run = (client, message) =>
{
  em = new Discord.RichEmbed();
  em.setTitle("Rule 3:")
    .setColor(0xFF0000)
    .setDescription("**Keep it safe for work.** Explicit content, such as sexualized, violent, or otherwise disturbing imagery or language, as well as unwelcome advances, are strictly prohibited. As it is against Discord’s TOS to post such content on their platform, it is also against the rules of our server. Violating this rule is likely to be an immediate permanent ban. Not knowing the rules is not an excuse.");
  message.channel.send(em);
}
