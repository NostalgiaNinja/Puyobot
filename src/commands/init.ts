import config from '../config.json';
const botOwnerId = config.botOwnerID;

import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
sqlite3.verbose();
import path from 'path';
const dbFile = path.basename(path.dirname((require.main as NodeModule).filename)) + '/data/database.sqlite';
const db = new sqlite3.Database(dbFile);

export default {
  name: 'init',
  description: 'Intializes the database',
  args: true,
  usage: '<database | server>',
  category: 'Administration',
  execute(message: Discord.Message, args: string[]): void {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const type = args[0];

      try {
        if (message.channel.type === 'dm') {
          message.channel.send('Please do not use this command in DMs!');
          return;
        }
        if (type == 'database') {
          if (message.author.id != botOwnerId) {
            message.channel.send('"This is used to initialize the database.  If not initialized, ask the bot owner to run this command."');
            return;
          }
          db.run('CREATE TABLE IF NOT EXISTS server (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT, PRIMARY KEY(serverID)');

          message.channel.send('Database initialized successfully!');
          console.log('Database tables initialized.');
        }
        if (type == 'server') {
          db.run('INSERT INTO server (serverID) VALUES (?)', message.guild.id);
          console.log('Server ID initialized.');
          message.channel.send('Server ready!');
        }
      } catch (e) {
        console.log(e);
        message.channel.send(e);
      }
    }
  },
};