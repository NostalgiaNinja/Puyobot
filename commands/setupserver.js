const { prefix } = require('../config.json');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/sqlite.db');

module.exports = {
	name: 'setupserver',
	description: 'Set the server up for the database system to work accordingly.',
	args: true,
	usage: '<id> <ModID | ModChannel | MutedRole>',
	category: 'Administration',
	execute(message, args) {

		try {
			if(message.member.hasPermission('MANAGE_ROLES')) {
				let id = args[0];
				const type = args[1];

				// if it was a mention ie ModeratorID or MutedRoleID then
				if(id.includes('@&')) {
					id = id.slice(3, -1); // slice the snowflake indicators out so it can be used in SQL language
				}
				// if it is a channel, ie ModerationChannel then
				if(id.includes('#')) {
					id = id.slice(2, -1); // slice the snowflake indicators out so it can be used in SQL language.
				}

				db.all(`SELECT * FROM server WHERE serverID = ${message.guild.id}`, function(err, row) {
					// SQL: Select everything from the server table where the server ID comes from the Discord server
					if(!row) {
						message.channel.send(`Not initialized in database! first use \`${prefix}initialize server\` to set the database up for this server.`); // kindly throw an error.
						return;
					}

					else // else

					// Moderator ID type added data.
					if (type == 'ModID') {
						db.run(`UPDATE server SET moderatorID = '${id}' WHERE serverID = ${message.guild.id}`);
						message.channel.send('Moderator ID has been added to the database.');
					}

					// Moderator Channel type added data.
					else if (type == 'ModChannel') {
						db.run(`UPDATE server SET moderationChannel = '${id}' WHERE SERVERID = ${message.guild.id}`);
						message.channel.send('Moderator Channel has been added to the database.');
					}

					// Muted Role ID type added data
					else if (type == 'MutedRole') {
						db.run(`UPDATE server SET mutedRoleID = '${id}' WHERE SERVERID = ${message.guild.id}`);
						message.channel.send('Muted role ID has been added to the database.');
					}

					else {
						message.channel.send(`Invalid Type! Please read \`${prefix}help setupserver\` for details on how to use this command.`);
					}

				});
			}
		}
		catch (e) {
			console.log(e);
			message.channel.send('error: ', e);
		}
	},
};