import Discord from 'discord.js';

export default {
	name: '12chainsandwich',
	description: '12 Chain Sandwich',
	args: false,
	usage: '',
	category: 'fun',
	execute(message: Discord.Message): void {

		const em = new Discord.RichEmbed();
		em.setDescription('want to get good? 12 chain sandwich. Struggling with building forms? 12 chain sandwich. Already able to make 12 chain sandwich? 12 chain sandwich faster. Need to cover this month\'s bills? 12 chain sandwich. World coming to an end as the ground crumbles at your feet and everything is submerged in lava? Still 12 chain sandwich.');
		message.channel.send(em);
	},
};
