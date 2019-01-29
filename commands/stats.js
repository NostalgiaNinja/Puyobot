module.exports = {
	name: 'stats',
	description: 'Show statistical information of the server',
	args: false,
	usage: '',
	category: 'Administration',
	execute(message) {
		const Discord = require('discord.js');

        const em = new Discord.RichEmbed();

        em.setTitle(`Server statistics: ${message.guild.name}`);
        em.addField('Total users', message.guild.memberCount, true);
        em.addField('Owner', message.guild.owner.displayName, true);
        em.addField('Creation Date', message.guild.createdAt, false);
        em.addField('Server ID', message.guild.id, false);

        em.setColor(0x59AFEF);
        em.setThumbnail(message.guild.iconURL);

        message.channel.send(em);
	},
};