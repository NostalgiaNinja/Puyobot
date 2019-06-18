import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
sqlite3.verbose();
import path from 'path';
const dbFile = path.basename(path.dirname((require.main as NodeModule).filename)) + '/data/database.sqlite';
const db = new sqlite3.Database(dbFile);

export default {
  name: 'warn',
  description: 'Warn a user for their infraction.',
  args: true,
  usage: '<@user> <warning text>',
  aliases: ['w'],
  category: 'Administration',
  execute(message: Discord.Message, args: string[], client: Discord.Client): void {
    try {
      db.each(`SELECT * FROM server WHERE serverID = '${message.guild.id}'`, function(err, row): void {
        if (!row) return;

        if (message.member.hasPermission('MANAGE_ROLES')) {
          const em = new Discord.RichEmbed();
          const warnedUser = message.mentions.users.first();
          const warning = args.slice(1).join(' ');

          if (message.mentions.users.size === 0) {
            message.channel.send('no user to warn');
            return;
          }

          if (!warning) {
            message.channel.send('no warning description');
            return;
          }

          em.setTitle(`⚠ WARNING GIVEN TO ${warnedUser} ⚠`)
            .addField('User Name:', `${warnedUser.username}:${warnedUser.discriminator}`, true)
            .addField('Current Display name:', `${warnedUser}`, true)
            .addField('Warned for:', warning, false)
            .setColor(0xffff00);

          message.channel.send(em);

          // Have to test for undefined and check type as Text Channel as "Type Guards"
          // https://stackoverflow.com/questions/53563862/send-message-to-specific-channel-with-typescript
          const modChannel = client.channels.get(row.moderationChannel);
          if (!modChannel) return;
          if (!((modChannel): modChannel is Discord.TextChannel => modChannel.type === 'text')(modChannel)) return;
          modChannel.send(em).catch(console.error);
        } else {
          const em = new Discord.RichEmbed();
          em.setTitle("You can't use that.");
          em.setDescription("You don't have the permissions to warn other members.  This incident will be reported.").setColor(0xff0000);

          message.channel.send(em);

          const em2 = new Discord.RichEmbed();
          em2.setTitle('Warning used without permissions:');
          em2
            .addField('User Name: ', message.author.username, false)
            .addField('Message Content: ', message.content, false)
            .setFooter('No further action is required - this is just here to show command misuse');
          em2.setColor(0xff00ff);

          // Have to test for undefined and check type as Text Channel as "Type Guards"
          // https://stackoverflow.com/questions/53563862/send-message-to-specific-channel-with-typescript
          const modChannel = client.channels.get(row.moderationChannel);
          if (!modChannel) return;
          if (!((modChannel): modChannel is Discord.TextChannel => modChannel.type === 'text')(modChannel)) return;
          modChannel.send(em2).catch(console.error);
        }
      });
    } catch (e) {
      console.error(e);
    }
  },
};
