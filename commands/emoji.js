const Discord = require('discord.js');

exports.run = (client, message, args) =>
{
    let data = args[0]
    let emoji = client.emojis.find("name", `${data}`)
    message.channel.send(`${emoji}`);
}   
