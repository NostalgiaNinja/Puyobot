//kill script for reboots


exports.run = (client, message) =>  //kills the process so that you can relaunch it immediately after.
{
  try
  {
    const config = require("../config.json");
    if (message.author.id === config.botOwnerID) //don't know if this will work.
    {
      console.log("Bye bye~");
      client.destroy();
      process.exit();
    }

    else
    {
      console.log("cannot find config.botOwnerID");
      return;
    }
  }
  catch (e)
  {
    console.error(e);
  }
}
