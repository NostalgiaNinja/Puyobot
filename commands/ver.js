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
			.addField('Some guides', 'Fixed some guide functionality in puyobot, feel free to ask for guides.', false)
			.setFooter('Puyobot ver.' + version + ' made by Nostalgia Ninja');

		message.channel.send(em);

	},
};