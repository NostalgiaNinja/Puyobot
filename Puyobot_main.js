const Discord = require("discord.js");  //require the discord library so that we can use it
const client = new Discord.Client();  //start a new instance of client

const fs = require("fs");  //load filesystem

const config = require("./config.json");  //require the configuration file
var prefix = config.prefix; //grab the prefix from the configuration file


fs.readdir("./events", (err,files) =>
{
    files.forEach(file =>
    {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on("message", (message) =>
{

    if (message.author.bot) return; // check if author is a bot?
    if (message.content.indexOf(config.prefix) !== 0) return; //checks if config prefix is set correctly

    const args = message.content.slice(prefix.length).trim().split(/ +/g); //no spaces!!!
    const command = args.shift().toLowerCase();

    try
    {
        fs.open(`commands/${command}.js`,'r',(err,fd) =>  //fs.access - open, just read.
        {
            if (err)
            {
               return;
            }
            let commandFile = require(`./commands/${command}.js`); //NB: command handler script data
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

client.login(config.token); //NEVER store the token here, grab it from the configuration file instead!
