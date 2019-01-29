module.exports = {
	name: 'yuintensifies',
	description: 'Yu Intensifies!!!',
	args: false,
	usage: '',
	category: 'fun',
	execute(message) {
		const Discord = require('discord.js');

		const em = new Discord.RichEmbed();
		em.setImage('http://imgur.com/qeMQywX.gif');
		message.channel.send(em);
	},
};