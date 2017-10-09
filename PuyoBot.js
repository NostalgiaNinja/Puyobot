const Discord = require('discord.js');
const config = require('./config.json')

const client = new Discord.Client();
const em = new Discord.RichEmbed();

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
		em.setTitle("Rule 1:")
		  .setColor(0xFF0000)
		  .setDescription("**Moderation is done at our discretion.** That means you could very well be moderated for something that someone else wasn't. This is not an excuse to violate the rules. That being said, we are not able to monitor every message sent on the server, so please report inappropriate behavior if you see it. We're here to help, so don't be afraid to come to us.\n\n**How to report an issue:** \n**Pinging:** You can request immediate attention to a problem currently happening in any of our channels by pinging the **@Moderators** role. We advise pinging this role as a whole, so in the event that a specific Admin or Moderator isn’t available at the time, others may be able to handle it. \n**DMing**: For situations that require discretion, or can be handled over time, DMing is a better method. You are free to message any Admin or Moderator with your concerns, but please refrain from messaging all of us. We will help you as soon as we are able to!");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 1 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "r2"))
	{
		em.setTitle("Rule 2:")
		  .setColor(0xFF0000)
		  .setDescription("**Be excellent to each other.** This Discord is a joint effort across the entire Puyo community, and brings together people of many different creeds and upbringings, ages and backgrounds. Please treat everybody with respect. Trolling, inflammatory or derogatory comments, discrimination of any kind, hate speech, and personal attacks are not permitted. **Unacceptable content includes (but is not limited to)** use of autism/retard as a derogatory term, triggered jokes, gender jokes (including the use of ‘trap’ to describe a person), and racist terms.");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 2 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "r3"))
	{
		em.setTitle("Rule 3:")
		  .setColor(0xFF0000)
		  .setDescription("**Keep it safe for work.** Explicit content, such as sexualized, violent, or otherwise disturbing imagery or language, as well as unwelcome advances, are strictly prohibited. As it is against Discord’s TOS to post such content on their platform, it is also against the rules of our server. Violating this rule is likely to be an immediate permanent ban. Not knowing the rules is not an excuse.");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 3 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "r4"))
	{
		em.setTitle("Rule 4:")
			.setColor(0xFF0000)
			.setDescription("**Do not link to pirated material or discussions about where to pirate material.** Discussion about piracy, such as in the context of game emulation, is allowed. ");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 4 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "r5"))
	{
		em.setTitle("Rule 5:")
			.setColor(0xFF0000)
			.setDescription("**Repost artwork with a link to original source.** If the art is not yours, a link source must be given. If you cannot find a source, do not repost! If an artist requires permission to repost, ask! For a full guide on how to source, get permission for reposting, templates for asking permission from non-English speakers, and what to do in the event you are/are not given permission, please refer to this document: https://docs.google.com/document/d/1XLchLr0S7WUNNet8LLHSS7eVqvcj1PI2cg47jtKuZqM/edit");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: rule 4 specified. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "WAZZUP"))
	{
		message.channel.send("http://imgur.com/7uneviX");  //NB: GIFs don't work as embeds
		console.log('response from', message.author.username, 'sent: WAZZUP! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "CarbunclePop"))
	{
		message.channel.send("https://imgur.com/WrJmrmY");
		console.log('response from', message.author.username, 'sent: Ready? Go! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "yuintensifies"))
	{
		message.channel.send('http://imgur.com/qeMQywX');
		console.log('response from', message.author.username, 'sent: YU RANG intensifies! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "notpuyo"))
	{
		em.setImage("http://imgur.com/tf1Ycna");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: "Wait, what?" at', getDateTime());
	}

	if (message.content.startsWith(prefix + "freakout"))
	{
		em.setImage("http://imgur.com/Kl61MLn");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: BWAHHHHH! at', getDateTime());
	}

	if (message.content.startsWith(prefix + "DracoPraying"))
	{
		em.setImage("http://imgur.com/w4FeIqZ");
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: Draco Praying. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "AAAAAAA"))
	{
		message.channel.send('http://imgur.com/LdrIBUY');
		console.log('response from', message.author.username, 'sent: [screams internally]! at', getDateTime());
	}

	if (message.content.startsWith(prefix + 'badman'))
	{
		em.setImage("http://imgur.com/vER4TMz.jpg")
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: YOU\'RE A BAD MAN! at', getDateTime());
	}

	if (message.content.startsWith(prefix + 'help'))
	{
		em.setTitle("HELP!  Puyobot Command List")
		  .setColor(0x00FF00)
			.setDescription(".r1 \n.r2 \n.r3 \n.botrule \n.help \n.sauce \n.meme \n.request \n.ver \n.currentTime")
		message.reply("check your DMs!");
		message.member.send(em);
		console.log('response from', message.author.username, 'sent: Requested the bot list. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "meme"))
	{
		em.setTitle("Get your freshest memes here:")
		  .setColor(0xFFFF00)
		  .setDescription(".WAZZUP \n.notpuyo \n.freakout \n.AAAAAAA \n.yuintensifies \n.DracoPraying \n.CarbunclePop \n.thegirlwiththefunnyhat \n.badman");
		message.reply("check your DMs!");
		message.member.send(em);
		console.log('response from', message.author.username, 'sent: asked for memes. at', getDateTime());
	}

	if (message.content.startsWith(prefix + "thegirlwiththefunnyhat"))
	{
		em.setImage("http://imgur.com/6mBanRD")
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: So who\'s the girl with the funny hat? at', getDateTime());
	}

	if (message.content.startsWith(prefix + "ver"))
	{
		vem = new Discord.RichEmbed();
		vem.setTitle("Puyobot release candidate version 1.70")
 		   .setColor(0x215F88)
	 		 .setDescription("Changes made:")
			 .addField("total code rewrite:", "I changed everything from code blocks to embeds, making bot usage cleaner and bot maintenance more... fasionable", false)
			 .addField("Code beautification:", "the code now looks easier on the eyes, and now you can actually see what's going on", false)
			 .addField("File restructure:", "You now need a config.json file with prefix and your bot token as described in this guide: https://www.gitbook.com/book/anidiotsguide/discord-js-bot-guide", false)
			 .addField("As always, code is now pushed to github after being released.  You can find it here:" ," https://github.com/NostalgiaNinja/Puyobot", false)
			 .setFooter("Puyobot ver. 1.70 made by Nostalgia Ninja");
		message.channel.send(vem);
		console.log('response from', message.author.username, 'sent: Version history. at', getDateTime());
	}

	if (message.content,startsWith(prefix + "currentTime"))
	{
		em.setTitle("Current Bot Server Time (GMT+2.00 - South African Standard Time)")
		  .setColor(0x00FF00)
			.setDescription(getDateTime());
		message.channel.send(em);
		console.log('response from', message.author.username, 'sent: requested for current system date time on server');
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
