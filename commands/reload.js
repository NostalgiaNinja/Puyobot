exports.run = (client,message,args) =>
{
    const config = require("../config.json");
    if (message.author.id === config.botOwnerID)
    {
        try
        {
            if (!args || args.size < 1) return message.channel.send("please specify a command name to reload!");
            
            delete require.cache[require.resolve(`./${args[0]}.js`)];  //deletes the cache for the bot, since node.js is cache-based.
            message.channel.send(`the command ${args[0]} has been reloaded`);
        }
        catch (e)
        {
            console.log(e);
        }
    }
    else
    {
        message.channel.send("this command is intended for Bot Owner only, used to reload commands which require emergency fixing.");
    }
}