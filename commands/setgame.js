//set game (syntax: setgame [game name]) - needs botOwnerID from root directory.

exports.run = (client, message, args) =>
{
  const config = require("../config.json");

  if(message.author.id == config.botOwnerID)
  {
    {
      let gamename = args.slice(0).join(" ");

      message.channel.send("Set game to: " + gamename);
      client.user.setGame(gamename);
    }
  }
}
