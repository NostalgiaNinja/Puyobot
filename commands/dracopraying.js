module.exports = {
	name: 'dracopraying',
	description: 'Draco wishes you the best!',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/w4FeIqZ.png');
		message.channel.send(em);
	},
};