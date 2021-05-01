import Discord from 'discord.js';

export default {
  name: 'help',
  description: 'provides a command list or help on a specific command',
  aliases: ['h', 'commands'],
  category: ['Help'],
  usage: ['<command name - optional>'],
  async execute(message: Discord.Message, args: string[]): Promise<void> {
    const { commands, commandNames } = message.client;
    const em = new Discord.MessageEmbed();

    em.setColor(0x59afef);

    if (!args.length) {
      // em.addField('command list:', commands.map((command): string => command.name).join('\n'), true);
      em.addField('Command List: ', commandNames.join('\n'));
      em.setFooter(`\nyou can send \`${process.env.PREFIX}help <command name>\` to get info on a specific command!`);

      await message.author
        .send(em)
        .then((): void => {
          if (message.channel.type === 'dm') return;
          message.reply('Check your DMs!');
        })
        .catch((error): void => {
          console.error(`Could not send DM to ${message.author.tag}. \n`, error);
          message.reply("I can't access your DMs!  Do you have DMs disabled?");
        });

      return;
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find((c): boolean => c.aliases && c.aliases.includes(name));

    if (!command) {
      await message.reply('No such command!');
      return;
    }

    em.addField('Name:', command.name, true);
    if (command.category) em.addField('Category:', command.category, true);
    if (command.aliases) em.addField('Aliases:', command.aliases, true);
    if (command.description) em.addField('Description:', command.description, false);
    if (command.usage) em.addField('Usage:', process.env.PREFIX + command.name + ' ' + command.usage, false);

    message.channel.send(em);
  },
};
