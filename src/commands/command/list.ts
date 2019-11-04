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
  name: 'list',
  description: 'List the current commands and their ',
  aliases: [],
  category: ['Administration'],
  usage: ['.gg match [p1] ##-## [p2] [video-link?]'],
  async execute(message: Discord.Message): Promise<void> {
    const usageList = await new Promise<UsableCommand[]>((resolve, reject): void => {
      db.all(
        `SELECT serverID, commandName, roleID
         FROM command_usableBy`,
        (err, rows): void => {
          if (err) reject(err);
          resolve(rows);
        },
      );
    });

    // Get the current names of roles. The db only stores their IDs.
    usageList.forEach((command): void => {
      const roleObj = message.guild.roles.get(command.roleID);
      if (!roleObj) return; // Type narrowing
      const roleName = roleObj.name;
      command.roleName = roleName;
    });

    console.log(usageList);
  },
};
