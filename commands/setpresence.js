const Discord = require('discord.js');
const { prefix, botOwnerId } = require('../config.json');

module.exports = {
	name: 'setpresence',
	description: 'Provides administration the means to set a presence for the bot',
	args: true,
	usage: '[richpresence enum] [richpresence name]',
	category: 'Administration',
	aliases: ['sp'],
	execute(message, args, client) {

		if(message.author.id == botOwnerId) {
			{
				let richpresence = args[0];
				const gamename = args.slice(1).join(' ');


				// FANCY!! it worked first time, too!
				switch (richpresence) {
				case '0':
					richpresence = 0; // PLAYING
					break;

				case '1':
					richpresence = 1; // STREAMING
					break;

				case '2':
					richpresence = 2; // LISTENING
					break;

				case '3':
					richpresence = 3; // WATCHING
					break;

				default:
					message.channel.send('Invallid Presence mode - please look up ActivityType in DiscordJS.');
					break;
				}

				try {
					if (richpresence == '0' || richpresence == '1' || richpresence == '2' || richpresence == '3') {
						let rpvalue = '';
						if (richpresence == 0) {
							rpvalue = 'Playing';
						}
						else if (richpresence == 1) {
							rpvalue = 'Streaming';
						}
						else if (richpresence == 2) {
							rpvalue = 'Listening';
						}
						else {
							rpvalue = 'Watching';
						}

						const em = new Discord.RichEmbed();

						em.setTitle('Success!');
						em.addField('User Presence set to: ', rpvalue);
						em.addField('Set game name to: ', gamename);


						client.user.setPresence({ game: { name: gamename, type: richpresence } }); // setting user presence!
						message.channel.send(em);
					}
					else {
						message.channel.send(`\`Syntax: ${prefix}setpresence [richpresence enum] [game]\` \n where richpresence = 0, 1, 2, 3 `);
					}
				}
				catch(e) {
					message.channel.send('something went wrong: ' + e);
				}
			}
		}
		else {
			message.channel.send("command intended for bot owner use only!")
			break;
		}

	},
};