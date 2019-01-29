const Discord = require('discord.js');

module.exports = {
	name: 'r1',
	description: 'Displays Rule 1 in an embed',
	args: true,
	usage: '',
	execute(message) {

		const em = new Discord.RichEmbed();
		em.setTitle('Rule 1:')
			.setColor(0xFF0000)
			.addField('**Moderation is done at our discretion.**', 'We have a standard we follow whenever moderating, however each moderator will act differently in different situations. If you feel like you\'ve experienced or witnessed yourself or someone else being judged unfairly, don\'t hesitate to talk to any of the mods about it. (Preferably in private).\n\nAdditionally, while we highly recommend pinging the @Moderators role if anything happens, you\'re also free to come into our DMs if you wish to do so discreetly.');
		message.channel.send(em);
	},

};