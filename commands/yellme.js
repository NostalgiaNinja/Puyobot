module.exports = {
	name: 'yellme',
	description: 'Yell a Puyo Quest player with this meme!!!',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/ZaF0cac.jpg');
		message.channel.send(em);
	},
};