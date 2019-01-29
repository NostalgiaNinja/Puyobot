module.exports = {
	name: 'badman',
	description: 'You\'re a bad man!!!',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/vER4TMz.jpg');
		message.channel.send(em);
	},
};