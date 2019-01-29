// delete message handler - fires when a message is deleted, and then returns what got deleted.

const Discord = require('discord.js'); // need the discord.js constant so that we can create richEmbeds

const sqlite3 = require('sqlite3').verbose(); // open a verbose version of sqlite3
const db = new sqlite3.Database('./data/sqlite.db'); // open the database file


exports.run = (client, message) => {
	try {
		db.each(`SELECT * FROM server WHERE serverID = '${message.guild.id}'`, function(err, row) {
			// SQL - Select everything from server where serverID is the guild ID.  THEN

			if (!row) return; // Checks if the guildID has been initialized

			if (!client.channels.get(row.moderationChannel)) return; // checks if the channel exists

			if (message.content.length > 1000) return; // check if the command is higher than 1000 characters and if so don't throw an error.

			const em = new Discord.RichEmbed(); // create a new rich embed.
			em.setTitle('Message Deleted');
			em.addField('Message Author', message.author.username, true);
			em.addField('Message created at', message.createdAt, true);

			if (message.content.length !== 0) {
				em.addField('Message content:', message.content, false); // if there's no content, skip.
			}

			em.addField('Channel Name:', message.channel.name, false);
			em.setColor(0x59AFEF);
			em.setFooter('Message deleted at ' + new Date());

			client.channels.get(row.moderationChannel).send(em).catch(console.error); // posts the pretty embed in the moderation channel

		});
	}
	catch (e) {
		console.error(e);
	}
};
