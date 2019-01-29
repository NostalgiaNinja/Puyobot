const Discord = require('discord.js');
const { version } = require('../package.json');

module.exports = {
	name: 'ver',
	description: 'Versions, and what\'s new in the bot!',
	aliases: ['version', 'v'],
	category: ['Help'],
	usage: [''],
	execute(message) {

		const em = new Discord.RichEmbed();
		em.setTitle('Puyobot version ' + version)
			.setDescription('2019 rewrite')
			.setColor(0x59AFEF)
			.addField('new Help command', 'Every command now has help attached to it, and gives new information about aliasing', false)
			.addField('Aliases!', 'Commands now have new aliases. use the help command with your command of choice to get an alias', false)
			.setFooter('Puyobot ver.' + version + ' made by Nostalgia Ninja');

		message.channel.send(em);

	},
};