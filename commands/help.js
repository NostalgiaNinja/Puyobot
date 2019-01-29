module.exports = {
	name: 'help',
	description: 'provides a command list or help on a specific command',
	aliases: ['h', 'commands'],
	category: ['Help'],
	usage: ['<command name - optional>'],
	execute(message, args) {

		const { prefix } = require('../config.json');

		const { commands } = message.client;

		const Discord = require('discord.js');
		const em = new Discord.RichEmbed();

		em.setColor(0x59AFEF);

		if (!args.length) {

			em.addField('command list:', commands.map(command => command.name).join('\n'), true);
			em.setFooter(`\nyou can send \`${prefix} help <command name>\` to get info on a specific command!`);

			return message.author.send(em)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('Check your DMs!');
				})
				.catch(error => {
					console.error(`Could not send DM to ${message.author.tag}. \n`, error);
					message.reply('I can\'t access your DMs!  Do you have DMs disabled?');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('No such command!');
		}

		em.addField('Name:', command.name, true);
		if (command.category) em.addField('Category:', command.category, true);
		if (command.aliases)em.addField('Aliases:', command.aliases, true);
		if (command.description)em.addField('Description:', command.description, false);
		if (command.usage) em.addField('Usage:', prefix + command.name + ' ' + command.usage, false);

		message.channel.send(em);
	},
};
