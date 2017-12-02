//warn a user and log it in the moderation channel.

const Discord = require("discord.js");
const sql = require("sqlite");

exports.run = (client, message, args) =>
{
  try
  {
    sql.get(`SELECT * FROM server WHERE serverID = '${message.guild.id}'`).then(row =>
    {
  
      if (!row) return;

      if (message.member.roles.has(row.moderatorID))
      {
        em = new Discord.RichEmbed();
        let warnedUser = message.mentions.members.first();
        let warning = args.slice(1).join(" ");

        if (message.mentions.users.size === 0)
        {
          message.channel.send("no user to warn");
          return;
        }

        if (!warning)
        {
          message.channel.send("no warning description");
          return;
        }

        em.setTitle(`⚠ WARNING GIVEN TO ${warnedUser} ⚠`)
          .addField("User Name:", `${warnedUser.user.username}:${warnedUser.user.discriminator}`,true)
          .addField("Current Display name:", `${warnedUser}`,true)
          .addField("Warned for:",warning,false)
          .setColor(0xFFFF00);

        message.channel.send(em);
        client.channels.get(row.moderationChannel).send(em).catch(console.error);
        }
      });
    }
    catch (e)
    {
    console.error(e);
    }
}
