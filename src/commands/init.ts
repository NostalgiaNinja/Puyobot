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
  usage: '<database | server | charaicon | commands>',
  category: 'Administration',
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    if (message.member.hasPermission('MANAGE_ROLES')) {
      const type = args[0];

      try {
        if (message.channel.type === 'dm') {
          message.channel.send('Please do not use this command in DMs!');
          return;
        }
        if (type == 'database') {
          if (message.author.id != botOwnerId) {
            message.channel.send('This is used to initialize the database.  If not initialized, ask the bot owner to run this command.');
            return;
          }
          db.run('CREATE TABLE IF NOT EXISTS server (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT, PRIMARY KEY(serverID))');

          message.channel.send('Database initialized successfully!');
          console.log('Database tables initialized.');
        }
        if (type == 'commands') {
          if (message.author.id != botOwnerId) {
            message.channel.send(`Bot commands can't be used until the server owner enables them. Please notify a moderator.`);
            console.log(botOwnerId);
            console.log(message.author.id);
            return;
          }

          // Create the table if doesn't already exists. Same code as in /src/index.ts
          await new Promise((resolve, reject): void => {
            db.run(
              `CREATE TABLE IF NOT EXISTS command_settings (serverID TEXT, commandName TEXT, enabled BOOLEAN NOT NULL CHECK (enabled IN (0,1)), usageCount INT, PRIMARY KEY (serverID, commandName))`,
              (err): void => {
                if (err) reject(err);
                resolve();
              },
            );
          });
          await new Promise((resolve, reject): void => {
            db.run(`CREATE TABLE IF NOT EXISTS command_usableBy (serverID TEXT, commandName TEXT, roleID TEXT, PRIMARY KEY (serverID, commandName, roleID))`, (err): void => {
              if (err) reject(err);
              resolve();
            });
          });

          // You can reuse ".init commands" to add newly created commands to a table that already exists
          // First, get the list of current commands
          const currentCommands = await new Promise<string[]>((resolve, reject): void => {
            db.all(`SELECT DISTINCT commandName FROM command_settings`, (err, rows): void => {
              if (err) reject(err);
              resolve(rows.map((row): string => row.commandName));
            });
          });

          console.log(currentCommands);

          // Populate the command_settings table with the current commands
          // Only get new commands
          const loadedNames = message.client.commandNames;
          const commandNames = loadedNames.filter((name): boolean => !currentCommands.includes(name));
          console.log(commandNames);
          const serverID = message.guild.id;
          let modID = '';
          db.serialize((): void => {
            // Get the moderator ID
            db.get(`SELECT moderatorID FROM server`, (err, row): void => {
              modID = row['moderatorID'];
              if (modID === undefined || modID.length == 0) {
                message.channel.send(`Error. Couldn't setup the commands table because the moderatorID was not found or was invalid.`);
                return;
              }

              commandNames.forEach((name): void => {
                db.run(`INSERT INTO command_settings (serverID, commandName, enabled, usageCount)
                        VALUES (${serverID}, "${name}", 1, 0)`);

                // By default, all commands are enabled, but only usable by those with moderatorID.
                db.run(`INSERT INTO command_usableBy (serverID, commandName, roleID)
                        VALUES (${serverID}, "${name}", ${modID})`);
              });
            });
          });
        }
        if (type == 'server') {
          db.run('INSERT INTO server (serverID) VALUES (?)', message.guild.id);
          console.log('Server ID initialized.');
          message.channel.send('Server ready!');
        }
        if (type == 'charaicon') {
          db.run('CREATE TABLE IF NOT EXISTS charaicon (character TEXT, urlcode TEXT)');

          const em = new Discord.RichEmbed()
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
