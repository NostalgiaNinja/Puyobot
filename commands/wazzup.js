module.exports = {
	name: 'wazzup',
	description: 'Oshare Bones appears!',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/7uneviX.gif');
		message.channel.send(em);
	},
};