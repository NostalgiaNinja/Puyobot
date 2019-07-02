import Discord from 'discord.js';
import { version } from '../../package.json';

export default {
	name: 'ver',
	description: 'Versions, and what\'s new in the bot!',
	aliases: ['version', 'v'],
	category: ['Help'],
	usage: [''],
	execute(message: Discord.Message): void {

		const em = new Discord.RichEmbed();
		em.setTitle('Puyobot version ' + version)
			.setDescription('TypeScript update!')
			.setColor(0x59AFEF)
			.addField('TypeScript support added!', 'TypeScript now allows for easier use with a linter in VS Code.  Expect more frequent updates!', false)
			.setFooter('Puyobot ver.' + version + ' made by the English Puyo Puyo Community, for the English Puyo Puyo Communtiy!');

		message.channel.send(em);

	},
};