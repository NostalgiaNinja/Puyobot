const Discord = require('discord.js');
const config = require('./config.json')

const client = new Discord.Client();

const prefix = config.prefix;

client.on('ready', () => {
	console.log('PuyoBot active!');
	client.user.setGame("Puyo Puyo!! 20th Anniversary!");
});

client.login(config.token);

client.on('message', message =>
{
	if (message.content.startsWith(prefix + "r1"))
	{
		em = new Discord.RichEmbed();
		em.setTitle("Rule 1:")
		  .setColor(0xFF0000)
		  .setDescription("**Moderation is done at our discretion.** That means you could very well be moderated for something that someone else wasn't. This is not an excuse to violate the rules. That being said, we are not able to monitor every message sent on the server, so please report inappropriate behavior if you see it. We're here to help, so don't be afraid to come to us.\n\n**How to report an issue:** \n**Pinging:** You can request immediate attention to a problem currently happening in any of our channels by pinging the **@Moderators** role. We advise pinging this role as a whole, so in the event that a specific Admin or Moderator isn’t available at the time, others may be able to handle it. \n**DMing**: For situations that require discretion, or can be handled over time, DMing is a better method. You are free to message any Admin or Moderator with your concerns, but please refrain from messaging all of us. We will help you as soon as we are able to!");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 1 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "r2"))
	{
		em = new Discord.RichEmbed();
		em.setTitle("Rule 2:")
		  .setColor(0xFF0000)
		  .setDescription("**Be excellent to each other.** This Discord is a joint effort across the entire Puyo community, and brings together people of many different creeds and upbringings, ages and backgrounds. Please treat everybody with respect. Trolling, inflammatory or derogatory comments, discrimination of any kind, hate speech, and personal attacks are not permitted. **Unacceptable content includes (but is not limited to)** use of autism/retard as a derogatory term, triggered jokes, gender jokes (including the use of ‘trap’ to describe a person), and racist terms.");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 2 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "r3"))
	{
		em = new Discord.RichEmbed();
		em.setTitle("Rule 3:")
		  .setColor(0xFF0000)
		  .setDescription("**Keep it safe for work.** Explicit content, such as sexualized, violent, or otherwise disturbing imagery or language, as well as unwelcome advances, are strictly prohibited. As it is against Discord’s TOS to post such content on their platform, it is also against the rules of our server. Violating this rule is likely to be an immediate permanent ban. Not knowing the rules is not an excuse.");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 3 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "r4"))
	{
		em = new Discord.RichEmbed();
		em.setTitle("Rule 4:")
			.setColor(0xFF0000)
			.setDescription("**Do not link to pirated material or discussions about where to pirate material.** Discussion about piracy, such as in the context of game emulation, is allowed. ");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 4 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "r5"))
	{
		em = new Discord.RichEmbed();
		em.setTitle("Rule 5:")
			.setColor(0xFF0000)
			.setDescription("**Repost artwork with a link to original source.** If the art is not yours, a link source must be given. If you cannot find a source, do not repost! If an artist requires permission to repost, ask! For a full guide on how to source, get permission for reposting, templates for asking permission from non-English speakers, and what to do in the event you are/are not given permission, please refer to this document: https://docs.google.com/document/d/1XLchLr0S7WUNNet8LLHSS7eVqvcj1PI2cg47jtKuZqM/edit");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 5 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "WAZZUP"))
	{
		em = new Discord.RichEmbed();
		em.setImage("http://imgur.com/7uneviX.gif");
		message.channel.send(em);  //NB: Embeds require you to use full filenames for it to work.
		console.log('response from', message.author.username, 'sent: WAZZUP! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "CarbunclePop"))
	{
		em = new Discord.RichEmbed();
		em.setImage("https://imgur.com/WrJmrmY.gif");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: Ready? Go! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "yuintensifies"))
	{
		em = new Discord.RichEmbed();
		em.setImage("http://imgur.com/qeMQywX.gif");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: YU RANG intensifies! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "notpuyo"))
	{
		em = new Discord.RichEmbed();
		em.setImage("http://imgur.com/tf1Ycna.jpg");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: "Wait, what?" at', getDateTime());
	}

	if (message.content.startsWith(prefix + "freakout"))
	{
		em = new Discord.RichEmbed();
		em.setImage("http://imgur.com/Kl61MLn.gif");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: BWAHHHHH! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "DracoPraying"))
	{
		em = new Discord.RichEmbed();
		em.setImage("http://imgur.com/w4FeIqZ.png");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: Draco Praying. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "AAAAAAA"))
	{
		em = new Discord.RichEmbed();
		em.setImage("http://imgur.com/LdrIBUYjpg");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: [screams internally]! at', getDateTime());
	}

	if (message.content.startsWith(prefix + 'badman'))
	{
		em = new Discord.RichEmbed();
		em.setImage("http://imgur.com/vER4TMz.jpg")
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: YOU\'RE A BAD MAN! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "thegirlwiththefunnyhat"))
	{
		em = new Discord.RichEmbed();
		em.setImage("http://imgur.com/6mBanRD.jpg")
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: So who\'s the girl with the funny hat? at', getDateTime());
	}


	if (message.content.startsWith(prefix + 'help'))
	{
		em = new Discord.RichEmbed();
		try
		{
				em.setTitle("HELP!  Puyobot Command List")
		  		.setColor(0x00FF00)
					.setDescription(prefix + "r1\n" +
													prefix + "r2\n" +
													prefix + "r3\n" +
													prefix + "r4\n" +
													prefix + "r5\n" +
													prefix + "help\n" +
													prefix + "meme\n" +
													prefix + "ver\n" +
													prefix + "amIAlive\n" +
													prefix + "currentTime");
				message.reply("check your DMs!");
				message.member.send(em);
		}
		catch (e)
		{
				em.setTitle("Error!")
					.setColor(0xFF0000)
					.setDescription(e);
				message.channel.send("Cannot send message: Error details as follows:/n" + em + "\n ping NN immediately!");
		}
		console.log('response from', message.author.username, 'sent: Requested the bot list. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "meme"))
	{
		em = new Discord.RichEmbed();
		try
		{
			em.setTitle("Get your freshest memes here:")
		  	.setColor(0xFF00FF)
				.setDescription(prefix + "WAZZUP\n" +
												prefix + "notpuyo\n" +
												prefix + "AAAAAAA\n" +
												prefix + "freakout\n" +
												prefix + "yuintensifies\n" +
												prefix + "DracoPraying\n" +
												prefix + "CarbunclePop\n" +
												prefix + "thegirlwiththefunnyhat\n" +
												prefix + "badman");
			message.reply("check your DMs!");
			message.member.send(em);
		}
		catch (e)
		{
			em.setTitle("Error!")
				.setColor(0xFF0000)
				.setDescription(e)
			message.channel.send("Cannot send message: Error details as follows:/n" + em + "\n ping NN immediately!");
		}
		console.log('response from', message.author.username, 'sent: asked for memes. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "ver"))
	{
		em = new Discord.RichEmbed();
		em.setTitle("Puyobot release candidate version 1.71")
 		   .setColor(0x215F88)
	 		 .setDescription("Changes made:")
			 .addField("added an \"Am I Alive?\" function: ", "Now you can use your prefix and amIAlive to check if the bot is currently sending heartbeats(checks for latencies if the bot is alive and receiving messages as per async promises). Will have the last 3 pings, but if there aren't enough, it will make them undefined and use only the average of those available.", false)
			 .addField("Added further debugging to prevent the bot from dying without reason.", "Now the bot will state its async actions so that you know what it's doing.  Make sure that debug is set to 1 in your config.json", false)
			 .addField("More config.json stuff","Now you can set whether or not you want the bot to output debugging data.  Bot Owner ID (use developer ID to get your user ID) added for killswitches and diagnostics",false)
			 .addField("Added a killswitch for when the app needs to close manually. "," requires Bot Owner ID for verification sake.", false)
			 .setFooter("Puyobot ver. 1.71 made by Nostalgia Ninja");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: Version history. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "currentTime"))
	{
		em = new Discord.RichEmbed();
		em.setTitle("Current Bot Server Time (GMT+2.00 - South African Standard Time)")
		  .setColor(0x00FF00)
			.setDescription(getDateTime());
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: requested for current system date time on server');
	}

	if (message.content.startsWith(prefix + "amIAlive"))
	{
		//get the last 3 pings.
		var pingone = client.pings[0];
		var pingtwo = client.pings[1];
		var pingthree = client.pings[2];

		em = new Discord.RichEmbed();
		em.setTitle("Yes!")
		  .setColor(0x00FF00)
			.setDescription("Current Bot Latency: " + client.ping + "ms.") //broadcast the average of the past 3 pings
			.addField("Previous 3 latencies:\n", pingone + " ms.\n" + pingtwo + " ms.\n" + pingthree + " ms.") //broadcast the last 3 pings
			.setFooter("current bot time: " + getDateTime());
		message.channel.send(em);
		console.log("Ping! Latency at: " + client.ping + "ms.");
	}

	if (message.content.startsWith(prefix + "kill") && message.member.id == config.botOwnerID)
	{
		console.log("Bye bye~");
		client.destroy();
		process.exit();
	}

});


function getDateTime() {

	var date  = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	var minut = date.getMinutes();
	min = (minut < 10 ? "0" : "") + minut;

	var sec = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;

	var year = date.getFullYear();

	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;

	var day = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	return year + "/" + month + "/" + day + " - " + hour + ":" + minut + ":" + sec;
}

//Logging - Catching all output messages to console, Let's see what's wrong with it?
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

if (config.debug == "1")
{
	client.on("debug", (e) => console.info(e));  //NB: outputs token, be careful with this.
}
