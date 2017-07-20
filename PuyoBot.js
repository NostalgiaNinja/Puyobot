const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('PuyoBot active!');
	client.user.setGame('Puyo Puyo!! 20th Anniversary')
});

fs = require('fs');
var clientKey;

fs.readFile('ClientKey.txt', 'utf8', function read(err,data){
  if (err) {
    throw err;
  }
    clientKey = data;
    getClientKey();
});

function getClientKey(){
	client.login(clientKey);
}


client.on('message', message => {
	if (message.content === '.r1') {
	message.channel.send('```1. Moderation is done at our discretion. That means you could very well be moderated for something that someone else wasn\'t. This is not an excuse to violate the rules. That being said, we are not able to monitor every message sent on the server, so please privately report inappropriate behavior if you see it. We\'re here to help, so don\'t be afraid to come to us.```');
	console.log('response from', message.author.username, 'sent: rule 1 specified. at', getDateTime());
	}

	if (message.content === '.r2') {
	message.channel.send('```2. Be excellent to each other. This Discord is a joint effort across the entire Puyo community, and brings together people of many different creeds and upbringings, ages and backgrounds. Please try to act respectable. Trolling, insulting or derogatory comments, discrimination of any kind and personal attacks are highly discouraged.```');
	console.log('response from', message.author.username, 'sent: rule 2 specified. at', getDateTime());
	}

	if (message.content === '.r3') {
	message.channel.send('```3. Keep it safe for work. Sexually explicit content, including the use of sexualized imagery or language, as well as unwelcome advances, are strictly prohibited. Violating this rule is likely to be an immediate permanent ban. Not knowing the rules is not an excuse. You\'ve been warned.```');
	console.log('response from', message.author.username, 'sent: rule 3 specified. at', getDateTime());
	}


	if (message.content === '.botrule') {
		message.channel.send('```Please don\'t abuse the bot.  it doesn\'t take kindly to spamming messages.  This bot is running on a Raspberry Pi, after all.```');
	console.log('response from', message.author.username, 'sent: Bot specific rule specified. at', getDateTime());
	}

	if (message.content === '.request') {
		message.channel.send('```To request a new feature to the bot, send a DM to Nostalgia Ninja#8253.```');
	console.log('response from', message.author.username, 'sent: Feature request sent. at', getDateTime());
	}

	if (message.content === '.sauce') {
		message.channel.send('```Source the art that you\'ve posted!!! You can use SauceNAO or any reverse image alternative if you cannot find the image.   Unsourced art is disrespectful to artists who do all the hard work.```\n http://imgur.com/mhqw28W');
	console.log('response from', message.author.username, 'sent: Called out a user for posting unsourced art. at', getDateTime());
	}

	if (message.content === '.WAZZUP') {
		message.channel.send('http://imgur.com/7uneviX');
	console.log('response from', message.author.username, 'sent: WAZZUP! at', getDateTime());
	}

	if (message.content === '.notpuyo') {
		message.channel.send('http://imgur.com/tf1Ycna');
	console.log('response from', message.author.username, 'sent: "Wait, what?" at', getDateTime());
	}

	if (message.content === '.freakout') {
		message.channel.send('http://imgur.com/Kl61MLn');
	console.log('response from', message.author.username, 'sent: BWAHHHHH! at', getDateTime());
	}

	if (message.content === '.yuintensifies') {
		message.channel.send('http://imgur.com/qeMQywX');
	console.log('response from', message.author.username, 'sent: YU RANG intensifies! at', getDateTime());
	}

	if (message.content === '.DracoPraying') {
		message.channel.send('http://imgur.com/w4FeIqZ');
	console.log('response from', message.author.username, 'sent: Draco Praying. at', getDateTime());
	}

	if (message.content === '.AAAAAAA') {
		message.channel.send('http://imgur.com/LdrIBUY');
	console.log('response from', message.author.username, 'sent: [screams internally]! at', getDateTime());
	}

	if (message.content === '.list') {
		message.channel.send('``` .r1 \n .r2 \n .r3 \n .botrule \n .list \n .sauce \n .meme \n .request \n .ver \n .currentTime```');
	console.log('response from', message.author.username, 'sent: Requested the bot list. at', getDateTime());
	}

	if (message.content === '.meme') {
		message.channel.send('``` Get your freshest memes here: \n .WAZZUP \n .notpuyo \n .freakout \n .AAAAAAA \n .yuintensifies \n .DracoPraying \n .CarbunclePop \n .thegirlwiththefunnyhat \n .badman```');
	console.log('response from', message.author.username, 'sent: asked for memes. at', getDateTime());
	}

	if (message.content === '.CarbunclePop') {
	message.channel.send('https://cdn.discordapp.com/attachments/133012933260214272/292757199464300544/13664770_1114382908634960_724046004_n_1.gif');
	console.log('response from', message.author.username, 'sent: Ready? Go! at', getDateTime());
	}

	if (message.content === '.thegirlwiththefunnyhat'){
	message.channel.send('http://imgur.com/6mBanRD');
	console.log('response from', message.author.username, 'sent: So who\'s the girl with the funny hat? at', getDateTime());
	}

	if (message.content === '.badman') {
	message.channel.send('http://imgur.com/vER4TMz.jpg');
	console.log('response from', message.author.username, 'sent: YOU\'RE A BAD MAN! at', getDateTime());
	}

	if (message.content === '.ver') {
		message.channel.send('Puyobot rc1.60\nchanges made: We\'re now on GitHub!!! https://github.com/NostalgiaNinja/Puyobot  Git pushes will be updated with .ver every update.')
	}

	if (message.content === '.currentTime') {
		message.channel.send('current bot server time: ' + getDateTime());
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
