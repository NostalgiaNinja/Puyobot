# Puyobot

Public repository for Puyobot, the English Puyo Puyo Discord Community's private bot.

Puyobot is the simple and easy to use bot for Discord - specifically made for Puyo Puyo EN community.

To run: you will require a config.json file with the following format:
```
  {
     "token": "[YOUR BOT TOKEN HERE]",
     "prefix": ".",
     "botOwnerID": "[YOUR BOT OWNER ID HERE]",
     "debug": "0",
     "PPQTag": "[YOUR PPQ MENTIONABLE ROLE ID HERE]",
     "moderationChannel": "[YOUR MODERATION CHANNEL ID]",
     "moderatorid":[YOUR MODERATOR ROLE ID]

  }
```

For your convenience, config_template.json is there for you to use.  Just fill it in and rename it to start.

Note that you can set debug controls to 1 if you want to debug the bot.  Note however that it is slightly dangerous, as it will output token at times.

You can change the prefix as necessary before starting the bot and the bot will automatically detect the prefix necessary.

# Dependancies:

the bot requires the following to run.  Get these from NPM before starting the file:

    -Discord.JS

That's it!  Now you can create your own version of Puyobot!
