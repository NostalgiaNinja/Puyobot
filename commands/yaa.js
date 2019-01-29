module.exports = {
	name: 'yaa',
	description: 'Shio in a pot saying "Yaa"',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/gLgHsmo.png');
		message.channel.send(em);
	},
};