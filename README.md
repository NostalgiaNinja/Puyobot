# Puyobot

## v4 Notes
Dev environment with hot reloading that uses ts-node.
```bash
npm run dev
```

Production build that compiles normal JavaScript files to `built/`
```bash
npm run prod
```

### Setting up VS Code TypeScript Linting and Prettier
First you need to install the VS Code Eslint extension at https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint. ESLint will check for errors as you type.

Then install Prettier at https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode. Prettier will automatically clean up your file to conform to the style specified in `.prettierrc.js`. This helps keep code consistent between collaborators.

ESLint won't automatically lint TypeScript files. You need to go into File > Preferences > Settings > Search for `eslint.validate`, and open the settings.json.

Add:

```json
{
  ...,
  "eslint.autoFixOnSave":  true,
  "eslint.validate": [
    "javascript",
    {"language":  "typescript",  "autoFix":  true  }
  ]
}
```

### Using .env.json
Using the dotenv-json package, you can put environment variables in a JSON file as so:
```json
{
  "api_key": "string"
}
```

The dotenv-json package expects all variables to be strings. If you need to embed another JSON structure as an environment variable, you have to stringify it and make sure the `"` and `\` (for escaped characters like `\n`) are escaped on another level. Try:
```js
const json = {
  "test": "test"
}

const embeddedJsonString = JSON.stringify(json).replace(/"/g, '\\"').replace(/(\\)/g, '\\\\');
console.log(embeddedJsonString);
```

## Introduction

Public repository for Puyobot, the English Puyo Puyo Discord Community's private bot.

Puyobot is the simple and easy to use bot for Discord - specifically made for Puyo Puyo EN community.

To run: you will require a config.json file with the following format:
```
  {
     "token": "[YOUR BOT TOKEN HERE]",
     "prefix": ".",
     "botOwnerId": "[YOUR BOT OWNER ID HERE]",
     "debug": "0"
  }
```

For your convenience, config_template.json is there for you to use.  Just fill it in and rename it to start.

Note that you can set debug controls to 1 if you want to debug the bot.  Note however that it is slightly dangerous, as it will output token at times.

You can change the prefix as necessary before starting the bot and the bot will automatically detect the prefix necessary.

## Dependancies:

the bot requires the following to run.  Get these from NPM before starting the file:

      -Discord.JS
      -sqlite
      -fetch

an `npm install` generally gets the job done and sets the environment up for you.

## Creating new commands:

To create a new command, consider the following:

```
import Discord from 'discord.js';

module.exports = {
  name: 'name of command',
  description: 'description of what the command does',
  usage: '',  //usually this gets outputted as command ['']
  
  //execute now is handled through typeScript support - You will need to add types to each property you import.
  execute(message: Discord.Message): void {
    //command data goes here.  For consistency, make an embed called em and send the message with message.channel.send(em);
    //for example:

    const em = new Discord.RichEmbed()
          .setTitle('command title goes here')
          .setColor(0x000000) //color goes here, either recognizable colors or 0xRRGGBB in hex
          .setFooter('command footer goes here, if you want one');
    message.channel.semd(em).catch(console.error);
  },
}
```

Note: the execute method can have no arguments or links to the client, but it's recommended to add them when necessary.  message is Discord.message, so it is requred to send messages.
