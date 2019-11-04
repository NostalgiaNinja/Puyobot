import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');

interface UsableCommand {
  serverID: string;
  commandName: string;
  roleID: string;
  roleName: string;
}

export default {
  name: 'enable',
  description: 'List the current commands and their ',
  aliases: [],
  category: ['Administration'],
  usage: ['command enable [commandName] [@role | roleID]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    let role: Discord.Role;
    if (args[0] && !args[0].includes('@&')) {
      console.log('Supplied roleID string');
      role = message.guild.roles.get(args[0]);
    } else {
      console.log('Supplied roleID @');
      role = message.mentions.roles.first();
    }

    if (!role) {
      message.channel.send(`Error. You didn't supply a roleID or tag a role.`);
      return;
    }

    // Check if the command you're trying to enable is a valid command

    // Query the database for the current status of the role.
    // const usableStatus = await new Promise((resolve, reject): void => {
    //   db.all(
    //     `SELECT`
    //   )
    // })

    // Add role to command_usableBy table
    // db.run(
    //   `INSERT INTO command_usableBy (serverID, commandName, roleID)`
    // )
  },
};
