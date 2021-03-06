import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
import { ServerRow } from '../@types/db-types';
sqlite3.verbose();
const dbFile = './src/data/database.sqlite';
const db = new sqlite3.Database(dbFile);

export default {
  name: 'warn',
  description: 'Warn a user for their infraction.',
  args: true,
  usage: '<@user> <warning text>',
  aliases: ['w'],
  category: 'Administration',
  execute(message: Discord.Message, args: string[], client: Discord.Client): void {
    if (message.channel.type === 'dm') {
      const em = new Discord.MessageEmbed();

      em.setTitle('Server exclusive command')
        .setDescription('This command is intended for server use only!')
        .setFooter('With love, Nostalgia Ninja');

      message.channel.send(em);
      return;
    }
    try {
      db.each(`SELECT * FROM server WHERE serverID = '${message.guild?.id}'`, function(err, row: ServerRow): void {
        if (!row) return;

        if (message.member?.permissions.has('MANAGE_ROLES')) {
          const em = new Discord.MessageEmbed();
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
            .addField('User Name:', `${warnedUser?.username}:${warnedUser?.discriminator}`, true)
            .addField('Current Display name:', `${warnedUser}`, true)
            .addField('Warned for:', warning, false)
            .setColor(0xffff00);

          message.channel.send(em);

          // Have to test for undefined and check type as Text Channel as "Type Guards"
          // https://stackoverflow.com/questions/53563862/send-message-to-specific-channel-with-typescript
          client.channels.fetch(row.moderationChannel).then(modChannel => {
            if (!modChannel.isText()) return;
            modChannel.send(em).catch(console.error);
          });
        } else {
          const em = new Discord.MessageEmbed();
          em.setTitle("You can't use that.");
          em.setDescription("You don't have the permissions to warn other members.  This incident will be reported.").setColor(0xff0000);

          message.channel.send(em);

          const em2 = new Discord.MessageEmbed();
          em2.setTitle('Warning used without permissions:');
          em2
            .addField('User Name: ', message.author.username, false)
            .addField('Message Content: ', message.content, false)
            .setFooter('No further action is required - this is just here to show command misuse');
          em2.setColor(0xff00ff);

          // Have to test for undefined and check type as Text Channel as "Type Guards"
          // https://stackoverflow.com/questions/53563862/send-message-to-specific-channel-with-typescript
          client.channels.fetch(row.moderationChannel).then(modChannel => {
            if (!modChannel.isText()) return;
            modChannel.send(em2).catch(console.error);
          })
        }
      });
    } catch (e) {
      console.error(e);
    }
  },
};
