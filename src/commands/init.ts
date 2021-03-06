const botOwnerId = process.env.BOTOWNERID;

import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
sqlite3.verbose();
const dbFile = './src/data/database.sqlite';
const db = new sqlite3.Database(dbFile);

export default {
  name: 'init',
  description: 'Intializes the database',
  args: true,
  usage: '<database | server | charaicon>',
  category: 'Administration',
  execute(message: Discord.Message, args: string[]): void {
    if (message.channel.type === 'dm') {
      const em = new Discord.MessageEmbed();

      em.setTitle('Server exclusive command')
        .setDescription('This command is intended for server use only!')
        .setFooter('With love, Nostalgia Ninja');

      message.channel.send(em);
      return;
    }
    if (message.member?.hasPermission('MANAGE_ROLES')) {
      const type = args[0];

      try {
        if (!message.guild) throw Error(`message.guild is null.`);
        
        if (type == 'database') {
          if (message.author.id != botOwnerId) {
            message.channel.send('This is used to initialize the database.  If not initialized, ask the bot owner to run this command.');
            return;
          }
          db.run('CREATE TABLE IF NOT EXISTS server (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT, PRIMARY KEY(serverID))');

          message.channel.send('Database initialized successfully!');
          console.log('Database tables initialized.');
        }
        if (type == 'server') {
          db.run('INSERT INTO server (serverID) VALUES (?)', message.guild.id);
          console.log('Server ID initialized.');
          message.channel.send('Server ready!');
        }
        if (type == 'charaicon') {
          db.run('CREATE TABLE IF NOT EXISTS charaicon (character TEXT, urlcode TEXT)');

          const em = new Discord.MessageEmbed()
            .setTitle('Character Icon Tables initialized')
            .setDescription('Please contact a moderator to add character icons.')
            .setColor(0xff0000);

          message.channel.send(em);
          console.log('Character icons table initialized');
        }
      } catch (e) {
        console.log(e);
        message.channel.send(e);
      }
    }
  },
};
