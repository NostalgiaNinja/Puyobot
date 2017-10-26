const Discord = require('discord.js');

exports.run = (client, message) =>
{
  //get the last 3 pings.
  var pingone = client.pings[0];
  var pingtwo = client.pings[1];
  var pingthree = client.pings[2];

  em = new Discord.RichEmbed()
    .setTitle("Pong!")
    .setColor(0x00FF00)
    .setDescription("Current Bot Latency: " + client.ping + "ms.") //broadcast the average of the past 3 pings
    .addField("Previous 3 latencies:\n", pingone + " ms.\n" + pingtwo + " ms.\n" + pingthree + " ms.") //broadcast the last 3 pings
    .setFooter(new Date());
  message.channel.send(em).catch(console.error);
  console.log("Ping! Latency at: " + client.ping + "ms.");
}
