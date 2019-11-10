import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');

interface QueryRow {
  commandName: string;
  roleID: string;
}

export default {
  name: 'enable',
  description: 'List the current commands and their ',
  aliases: [],
  category: ['Administration'],
  usage: ['command enable [commandName] [@role | roleID]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    // Check if arguments were passed
    if (args.length == 0) {
      message.channel.send('Error. Insufficient parameters.');
      return;
    }

    // Check if the command you're trying to enable is a valid command
    const isValidCommand = message.channel.client.commandNames.includes(args[0]);
    if (!isValidCommand) {
      message.channel.send(`Error. The command you're trying to enable permissions for could not be found.`);
      return;
    }

    // Check if the role you're trying to enable permissions for is a valid role
    const role = args[1] && !args[1].includes('@&') ? message.guild.roles.get(args[1]) : message.mentions.roles.first();

    if (!role) {
      message.channel.send(`Error. You didn't supply a roleID or tag a role.`);
      return;
    }

    // Get parameters
    const serverID = message.guild.id;
    const commandName = args[0];
    const roleID = role.id;

    // Query the database for the current role
    // Each row indicates that the role is enabled for the row's roleID
    const tableRows = await new Promise<QueryRow[]>((resolve, reject): void => {
      db.all(
        `SELECT commandName, roleID
         FROM command_usableBy
         WHERE serverID = '${serverID}' AND commandName = '${commandName}'`,
        (err, rows): void => {
          if (err) reject(err);
          resolve(rows);
        },
      );
    });

    // Check if the role already has the command enabled.
    const isAlreadyEnabled = tableRows.some((row): boolean => row['roleID'] === roleID);
    if (isAlreadyEnabled) {
      message.channel.send(`Error. The role ${role.name} already has permission to use the command: ${commandName}`);
      return;
    }

    // Add role to command_usableBy table
    db.run(
      `INSERT INTO command_usableBy (serverID, commandName, roleID)
       VALUES (?, ?, ?)`,
      [serverID, commandName, roleID],
      (err): void => {
        if (err) {
          console.error(err.message);
          message.channel.send(`Error. Failed to enable the role in the database.`);
          return;
        }
        message.channel.send(`Success. The role ${role.name} can now use the command: ${commandName}.`);
      },
    );
  },
};
