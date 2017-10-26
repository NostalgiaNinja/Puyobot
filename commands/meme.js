const Discord = require('discord.js');

const config = require ('../config.json');

prefix = config.prefix;

exports.run = (client, message) =>
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
    message.channel.send("Cannot send message: Error details as follows:/n" + e + "\n ping NN immediately!");
  }
}
