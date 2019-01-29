const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Just pings the program to see if it\'s alive',
	usage: '',
	execute(message) {

		const em = new Discord.RichEmbed()
			.setTitle('Pong!')
			.setColor(0x00FF00);
		message.channel.send(em).catch(console.error);
	},
};