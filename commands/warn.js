const Discord = require('discord.js');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sqlite.db');

module.exports = {
	name: 'warn',
	description: 'Warn a user for their infraction.',
	args: true,
	usage: '<@user> <warning text>',
	aliases: ['w'],
	category: 'Administration',
	execute(message, args, client) {
		try {
			db.each(`SELECT * FROM server WHERE serverID = '${message.guild.id}'`, function(err, row) {

				if (!row) return;

				if (message.member.hasPermission('MANAGE_ROLES')) {
					const em = new Discord.RichEmbed();
					const warnedUser = message.mentions.users.first();
					const warning = args.slice(1).join(' ');

					if (message.mentions.users.size === 0) {
						message.channel.send('no user to warn');
						return;
					}

					if (!warning) {
						message.channel.send('no warning description');
						return;
					}

					em.setTitle(`⚠ WARNING GIVEN TO ${warnedUser} ⚠`)
						.addField('User Name:', `${warnedUser.username}:${warnedUser.discriminator}`, true)
						.addField('Current Display name:', `${warnedUser}`, true)
						.addField('Warned for:', warning, false)
						.setColor(0xFFFF00);

					message.channel.send(em);
					client.channels.get(row.moderationChannel).send(em).catch(console.error);
				}
				else {
					const em = new Discord.RichEmbed();
					em.setTitle('You can\'t use that.');
					em.addDescription('You don\'t have the permissions to warn other members.  This incident will be reported.')
						.setColor(0xFF0000);

					message.channel.send(em);

					const em2 = new Discord.RichEmbed();
					em2.setTitle('Warning used without permissions:');
					em2.addField('User Name: ', message.author.username, false)
						.addField('Message Content: ', message.content, false)
						.AddFooter('No further action is required - this is just here to show command misuse');
					em2.setColor(0xFF00FF);
					client.channels.get(row.moderationChannel).send(em2).catch(console.error);
				}
			});
		}
		catch (e) {
			console.error(e);
		}
	},
};