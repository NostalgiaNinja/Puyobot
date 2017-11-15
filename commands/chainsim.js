const FetchStream = require('fetch').FetchStream;
const Discord = require('discord.js');

exports.run = (client, message, args) =>
{
  let chainid = args[0];

  if (!chainid)
  {
    message.channel.send(`No chain ID.  Syntax: \`.chainsim [chain ID]\``);
    return;
  }

  if (chainid.includes("https://puyonexus.com/chainsim")) //cleanup the code - No need to run checks if that's not done.
  {
    if (chainid.startsWith("https://puyonexus.com/chainsim/chain/"))  //check for chain link instead
    {
      chainid = chainid.slice(-5);
    }
    if (chainid.endsWith(".png") || chainid.endsWith(".gif")) //check for file extensions
    {
      chainid = chainid.slice(-9, -4);
    }
  }

  try
  { 
  var testRegex =/^[a-zA-Z0-9\s]*$/;  
  if (testRegex.test(chainid) == false)  //tests if the value is false, and if so, throws an error.
  {
    message.channel.send("Invalid chainsim ID");
    return;
  }
  else
  {
  var fetch = new FetchStream("https://puyonexus.com/chainsim/api/info/" + chainid)

  fetch.on("data", function(buffer)
  {
    var bufferConvert = buffer.toString('utf8');
    var table = JSON.parse(bufferConvert);

    //chain title, chain link, chain image

    if (table.success)
    {
      em = new Discord.RichEmbed();

      em.setTitle("Puyobot Chainsim tool for Puyo Nexus Chainsim")
        .addField("Chain Title: ",table.data.title,false)
        .addField("Chain Link: ","https://puyonexus.com/chainsim/chain/" + chainid,false)
        .setImage("https://puyonexus.com/chainsim/image/" + chainid + ".png")
        .setColor(0x34495E);

      message.channel.send(em);
    }
    else
    {
      message.channel.send("Invalid chain ID!");
    }
  })
  }
  }
  catch (e)
  {
    console.log(chainid, e);
    message.channel.send("Invalid Chain ID or source!")
  }
}
