module.exports = {
	name: 'lightenup',
	description: 'Lighten up will you?',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/16JpwSp.jpg');
		message.channel.send(em);
	},
};