import Discord from 'discord.js';

export default {
  name: 'getroleid',
  description: 'Get the role ID from its current name or @',
  aliases: [],
  category: ['Administration'],
  usage: ['command enable [commandName] [@role | roleID]'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    console.log(message.content);
    if (!args[0]) {
      message.channel.send(`Error. You didn't supply a role name to check.`);
      return;
    }

    const roleName = args.join(' ');

    if (roleName.includes('@&')) {
      message.channel.send(`The role id for ${roleName} is: ${roleName.replace(/[^0-9]/g, '')}`);
      return;
    } else {
      // Search the guild's list of roles for a matching name.
      const targetRole = message.guild.roles.find((role): boolean => role.name === roleName);
      if (!targetRole) {
        message.channel.send(`Error: The role, ${roleName}, could not be found. Did you spell it correctly?`);
        return;
      } else {
        message.channel.send(`The role id for ${roleName} is: ${targetRole.id}`);
        return;
      }
    }
  },
};
