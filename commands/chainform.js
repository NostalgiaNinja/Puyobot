const discord = require('discord.js');

module.exports = {
	name: 'chainform',
	description: 'Provides the list of chaining forms if none are listed.',
	aliases: ['cf'],
	category: ['Help'],
	usage: [''],
	execute(message) {
		const em = new discord.RichEmbed();

		em.setColor(0x59AFEF);
		em.setTitle('List of Chaining forms');
		em.setDescription('https://puyonexus.com/wiki/List_of_Chaining_Forms');

		// TODO: mini-guides.

		message.channel.send(em);
	},
};