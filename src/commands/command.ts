import Discord from 'discord.js';
import fs from 'fs';
import path from 'path';
import { Command } from '../@types/bot';

const cmdCommands = new Discord.Collection();

const commandFiles = fs.readdirSync(path.resolve(__dirname, './command/')).filter((file: string): boolean => /(\.js|\.ts)/.test(file));
commandFiles.forEach((file: string): void => {
  const command: Command = require(path.resolve(__dirname, `./command/${file}`)).default;
  cmdCommands.set(command.name, command);

  // Clone additional commands if current command has aliases
  if (command.aliases && command.aliases.length > 0) {
    command.aliases.forEach((alias): void => {
      cmdCommands.set(alias, command);
    });
  }
});

export { cmdCommands };

export default {
  name: 'command',
  description: 'Commands enabling and disabling user commands.',
  aliases: [],
  category: ['Administration'],
  usage: ['command [enable/disable/permissions/getRoleId] [commandName]'],
  execute(message: Discord.Message, args: string[], client: Discord.Client): void {
    // Only allow administrators to use this command
    if (!message.member.hasPermission('ADMINISTRATOR')) return;

    // Exit if command is run without any parameters
    if (args.length === 0) {
      message.reply('.command was called without any parameters');
      return;
    }

    // Parse the subcommand from the args.
    // Exit if the subcommand can not be found.
    const subCommandName = args[0].toLowerCase();
    const subCommand = <Command>cmdCommands.get(subCommandName);
    if (!subCommand) return;

    try {
      subCommand.execute(message, args.slice(1), client);
    } catch (e) {
      console.error(e);
      message.channel.send('Error: View console log for more details.');
    }
  },
};
