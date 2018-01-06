const Discord = require('discord.js');
const moment = require(`moment-timezone`);
const sql = require('sqlite');

exports.run = (client, message,args) =>
{
    let request = args[0];

    em = new Discord.RichEmbed();

  try
  {
    if (!request)
    {
      em.setTitle("Current Bot Server Time (GMT+2.00 - South African Standard Time)")
        .setColor(0x00FF00)
        .setDescription(new Date()); //Do it the old way
      message.channel.send(em);
    }
    if (request == "help")
    {
      message.channel.send("Please use this to find your timezone: http://momentjs.com/timezone");
      return;
    }
    if (request != undefined || request !== "help")
    {
      let requestTime = moment.tz(`${request}`);

      em.setTitle(`Current time in ${request}`)
        .setColor(0x59AFEF)
        .setDescription(requestTime);
      message.channel.send(em);
    }

  }

  catch (e)
  {
    console.log(e);
  }
}

/*TODO:
1) Add timezone arguments
2) parse timezones correctly.
*/
