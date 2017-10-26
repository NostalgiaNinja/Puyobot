//warn a user and log it in the moderation channel.

const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (client, message, args) =>
{
  try
  {
    if (message.member.roles.has(config.moderatorid))
    {
      em = new Discord.RichEmbed();
      let warnedUser = args[0];
      let warning = args.slice(1).join(" ");

      em.setTitle(`⚠ WARNING GIVEN TO ${warnedUser} ⚠`)
        .setDescription("**Warned user for**: " + warning)
        .setColor(0xFFFF00);

      message.channel.send(em);
      client.channels.get(config.moderationChannel).send(em).catch(console.error);
    }
  }
  catch (e)
  {
    console.error(e);
  }
}
