module.exports = {
	name: 'notpuyo',
	description: 'He doesn\'t play Puyo!?!?',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/tf1Ycna.jpg');
		message.channel.send(em);
	},
};