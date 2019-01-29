const { prefix } = require('../config.json');

module.exports = {
	name: 'poll',
	description: 'Gives the user to give a poll with up to 4 answers.',
	aliases: ['p'],
	category: ['Fun'],
	usage: ['<poll question>, <poll answer 1>, <poll answer 2>, <poll answer 3>, <poll answer 4>'],
	execute(message) {

		const args = message.content.slice(prefix.length).split(', ');

		if (!args.length) {
			return message.channel.send('Poll set up incorrectly. use the help command to see how this works.');
		}
		else {

			const Discord = require('discord.js');

			const em = new Discord.RichEmbed();

			em.setTitle(`${message.author.username} asks:`)
				.setColor(0x215F88);

			if (args[0].startsWith('p ')) args[0] = args[0].slice(1);

			if (args[0].startsWith('poll ')) args[0] = args[0].slice(4);

			em.setDescription(args[0]);

			if (args[1]) {
				em.addField('Poll Answer 1', args[1], false);
			}

			if (args[2]) {
				em.addField('Poll Answer 2', args[2], false);
			}

			if (args[3]) {
				em.addField('Poll Answer 3', args[3], false);
			}

			if (args[4]) {
				em.addField('Poll Answer 4', args[4], false);
			}

			message.channel.send(em).then(sentMessage => {

				if (args[1]) {
					sentMessage.react('1⃣');
				}
				if (args[2]) {
					sentMessage.react('2⃣');
				}
				if (args[3]) {
					sentMessage.react('3⃣');
				}
				if (args[4]) {
					sentMessage.react('4⃣');
				}
			});
		}

	},
};