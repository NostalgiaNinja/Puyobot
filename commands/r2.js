const Discord = require('discord.js');

module.exports = {
	name: 'r2',
	description: 'Displays Rule 2 in an embed',
	args: true,
	usage: '',
	execute(message) {

		const em = new Discord.RichEmbed();
		em.setTitle('Rule 1:')
			.setColor(0xFF0000)
			.setDescription('Intentionally causing disruptions or harm to anyone is unacceptable. Every user from here come from a variety of places and upbringings, so please treat everyone with equal respect.\n*Unacceptable behaviour include, but are not limited to: Use of offensive slurs, making fun of people for disabilities, sexuality, and/or identity, (This includes the use of "trap", "triggered", "autism", "retard", and more.) and in general harassing people in any way.*');
		message.channel.send(em);
	},

};