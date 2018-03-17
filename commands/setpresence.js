//set game (syntax: setgame [game name]) - needs botOwnerID from root directory.

exports.run = (client, message, args) =>
{
  const config = require("../config.json");
  const prefix = config.prefix;

  if(message.author.id == config.botOwnerID)
  {
    {
      let richpresence = args[0];
      let gamename = args.slice(1).join(" ");


      //FANCY!! it worked first time, too!
      switch (richpresence)
      {
        case '0':
            richpresence = 0;  //PLAYING
            break;

        case '1':
            richpresence = 1;   //STREAMING
            break;

        case '2':
            richpresence = 2;   //LISTENING
            break;

        case '3':
            richpresence = 3;   //WATCHING
            break;
        
        default:
            message.channel.send("Invallid Presence mode - please look up ActivityType in DiscordJS.");
            break;
      }

      try
      {
          if (richpresence == '0' || richpresence == '1' || richpresence == '2' || richpresence == '3')
          {
                message.channel.send("Set user presence to: " + gamename);
                client.user.setPresence({ game: { name: gamename, type: richpresence}}); //setting user presence!
          }
          else
          {
              message.channel.send(`\`Syntax: ${prefix} [richpresence enum] [game]\` \n where richpresence = 0, 1, 2, 3 `);
          }
      }
      catch(e)
      {
        message.channel.send("something went wrong: " + e);
      }
    }
  }
}
