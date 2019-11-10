import Discord from 'discord.js';
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./src/data/database.sqlite');

interface UsableCommand {
  serverID: string;
  commandName: string;
  roleID: string;
  roleName: string;
}

interface Role {
  roleID: string;
  roleName: string;
}

interface CommandData {
  commandName: string;
  roles: Role[];
}

export default {
  name: 'permissions',
  description: 'List the current permissions for a command. If no command name is given, then all permissions will be listed.',
  aliases: [],
  category: ['Administration'],
  usage: ['command permissions [commandName]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    const dbTable = await new Promise<UsableCommand[]>((resolve, reject): void => {
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
    dbTable.forEach((command): void => {
      const roleObj = message.guild.roles.get(command.roleID);
      if (!roleObj) return; // Type narrowing
      const roleName = roleObj.name;
      command.roleName = roleName;
    });

    // Get unique set of all the commands
    const commandNames = dbTable.map((row): string => row.commandName);
    const commandSet = new Set(commandNames);

    const commandDataList = Array.from(commandSet).map(
      (commandName): CommandData => {
        // Look up the command in dbTable
        const rows = dbTable.filter((row): boolean => row.commandName === commandName);

        // Create Role objects from these rows
        const roles = rows.map(
          (row): Role => {
            return {
              roleID: row.roleID,
              roleName: row.roleName,
            };
          },
        );

        // Return a CommandData object
        return {
          commandName: commandName,
          roles: roles,
        };
      },
    );

    // If a specific command name is provided, return a listing for just that command
    if (args[0]) {
      // Check if the command you're trying to enable is a valid command
      const isValidCommand = message.channel.client.commandNames.includes(args[0]);
      if (!isValidCommand) {
        message.channel.send(`Error. The command named ${args[0]} could not be found.`);
        return;
      }

      // Send message about current command
      const commandData = commandDataList.filter((c): boolean => c.commandName === args[0])[0];
      commandData.roles.forEach((role): void => {
        console.log(role.roleName);
      });
      message.channel.send(`**${commandData.commandName}** | Enabled for: ${commandData.roles.map((role): string => role.roleName).join(', ')}\n`);
      return;
    }

    // Otherwise, list all commands.
    const messages: string[] = [];
    commandDataList.forEach((commandData): void => {
      messages.push(`**${commandData.commandName}** | Enabled for: ${commandData.roles.map((role): string => role.roleName).join(', ')}\n`);
    });

    let text = '';
    messages.forEach((msg): void => {
      if ((text + msg).length > 2000) {
        message.channel.send(text);
        text = '';
      }
      text += msg;
    });

    if (text.length > 0) {
      message.channel.send(text);
    }
  },
};
