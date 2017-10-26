const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();

const prefix = config.prefix;

fs.readdir("./events/", (err, files) =>
{
    files.forEach(file =>
    {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on("message", message =>
{
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); //<-- No spaces!!!
  const command = args.shift().toLowerCase();

  try
  {
		fs.open(`commands/${command}.js`,'r',(err,fd) =>
		{
				if (err)
				{
					return;
				}
				let commandFile = require(`./commands/${command}.js`); //command handler data - fixed :)
		    commandFile.run(client, message, args);
		});
  }
  catch (e)
  {
    console.error(e);
  }

});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

if (config.debug == "1")
{
	client.on("debug", (e) => console.info(e));  //NB: outputs token, be careful with this.
}

client.login(config.token);
