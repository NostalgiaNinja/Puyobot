const discord = require('discord.js');

module.exports = {
	name: 'guide',
	description: 'Provides a set of guides for Puyo players to better themselves at playing Puyo.',
	aliases: ['g'],
	category: ['Help'],
	usage: [''],
	execute(message) {
		const em = new discord.RichEmbed();

		em.setColor(0x59AFEF);
		em.setTitle('Guides:');
		em.addField('Puyo Nexus: How to play Puyo Puyo!', 'https://puyonexus.com/wiki/How_to_Play_Puyo_Puyo',false);
		em.addField('Puyo Puyo lesson plan', 'https://puyo.guide',false);
		em.setFooter('Guides will be added when they are released.');

		// TODO: mini-guides.

		message.channel.send(em);
	},
};