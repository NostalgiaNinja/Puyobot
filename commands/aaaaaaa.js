module.exports = {
	name: 'aaaaaaa',
	description: 'AAAAAAAAA!!!',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/LdrIBUY.jpg');
		message.channel.send(em);
	},
};