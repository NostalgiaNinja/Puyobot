// initialization of variables
const fs = require('fs');	// internal filesystem
const Discord = require('discord.js');	// Discord.JS repository
const client = new Discord.Client();	// Discord Client

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));
// read the directory for any JS files.

const config = require('./config.json');	// configuration file

const prefix = config.prefix;	// prefix from configuration file

// database stuff

const dbFile = './data/sqlite.db';
const exists = fs.existsSync(dbFile);
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(dbFile);

db.serialize(function() {

	if (!exists) {
		db.run('CREATE TABLE IF NOT EXISTS server (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT)');

		console.log('Database not found.  Creating new database.');
	}

	console.log('Database files initialized');

});

// for list of files do said command.
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

fs.readdir('./events', (err, files) => {
	files.forEach(file => {
		const eventFunction = require(`./events/${file}`);
		const eventName = file.split('.')[0];

		client.on(eventName, (...args) => eventFunction.run(client, ...args));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});


client.on('message', (message) => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// don't fuss with bots who check for pings.

	const args = message.content.slice(prefix.length).split(/ +/);
	// provide arguments for the system to work.
	const commandName = args.shift().toLowerCase();
	// make everything non-case sensitive.

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));/**/

	if (!command) return;

	try {
		command.execute(message, args, client);
		// get command name, and execute it in the commands directory.
	}
	catch (e) {
		console.error(e);
		message.channel.send('Error: view console log for more details.');
		// if there's an issue, provide the error.
	}

});

client.login(config.token);	// login special sauce with the token.
