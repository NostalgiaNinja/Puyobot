module.exports = {
	name: 'badman',
	description: 'Ready?  Go!',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('https://imgur.com/WrJmrmY.gif');
		message.channel.send(em);
	},
};