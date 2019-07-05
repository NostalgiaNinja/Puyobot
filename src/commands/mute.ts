import Discord from 'discord.js';  //discord JS library - needed for API access
import sqlite3 from 'sqlite3';   //Sqlite 3 - Needed to role to time out
const db = new sqlite3.Database('./data/database.sqlite');    //database file.

export default {
	name: 'mute',
	description: 'Moderator command: adds the timeout role to the user.  User gets untimed out at a specified time.',
	args: true,
	usage: '[user] [time in days] [reason]',
	category: 'Administration',
	execute(message: Discord.Message, args: string[]): void {
		try {
			db.each(`SELECT * FROM server WHERE serverID = '${message.guild.id}'`, function(err, row) {

				if (!row) return;

				if (message.member.hasPermission('MANAGE_ROLES')) {
                    //variables for the command

                    const em = new Discord.RichEmbed();
                    const timeoutUser = message.mentions.members.first();
                    const reason = args.slice(1).join(' ');
					
					
					//for now, let's not do any time allocation stuff until finalized.
                    //const currentTime = moment();
                    //const endTime = moment.add(mutedTime, 'days');


					if (message.mentions.members.size === 0) {
						message.channel.send('No user to time out. exiting.');
						return;
					}

					if (!reason) {
						message.channel.send('No reason to time out.  exiting.');
						return;
                    }

					timeoutUser.addRole(row.mutedRoleID, reason);

					em.setTitle(`🛑 Timeout given to ${timeoutUser} 🛑`)
						.addField('User Name:', `${timeoutUser.user.username}:${timeoutUser.user.discriminator}`, true)
						.addField('Current Display name:', `${timeoutUser}`, true)
                        .addField('Timed out for:', reason, false)
						.setColor(0xFF0000);

					message.channel.send(em);
					client.channels.get(row.moderationChannel).send(em).catch(console.error);
				}
				else {
                    return;
				}
			});
		}
		catch (e) {
			console.error(e);
		}
	},
};
