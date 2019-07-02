import Discord from 'discord.js';

export default {
	name: 'support',
	description: 'Support Discord for Puyobot and any miscellaneous bots owned by NN',
	args: false,
	usage: '',
	category: 'Help',
	execute(message: Discord.Message): void {

        const em = new Discord.RichEmbed();
        em.setTitle('Want to test for bugs in Puyobot?  Got an issue? Join the support server to fish for bugs in the code!  Issues and requests are open ')
        em.setDescription('Server invite link: https://discord.gg/DShgHKw \nCurrent Scope: improving Puyobot\'s commands as a mainline bot.');
        em.setColor(0x1ABC9C);
        em.setThumbnail('https://cdn.discordapp.com/avatars/386535168694943745/d01aa4ad5f270edcbaecac51b66a7806.png?size=256');
		message.channel.send(em);
	},
};
