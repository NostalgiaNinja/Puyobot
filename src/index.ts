// -- Environment stuff
import * as fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
import config from './config.json';
import Discord from 'discord.js';
import { Command } from './@types/bot';
// import dotenv from 'dotenv';
// dotenv.config();

const prefix = config.prefix;

// Module augmentation to extend Discord.Client with "commands" property
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load command files
const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter((file: string): boolean => /(\.js|\.ts)/.test(file));
console.log(commandFiles);
commandFiles.forEach((file: string): void => {
  const command = require(path.resolve(__dirname, `./commands/${file}`)).default as Command;
  console.log(command);
  client.commands.set(command.name, command);

  // Clone additional commands in client.commands if the current command has aliases.
  if (command.aliases) {
    command.aliases.forEach((alias): void => {
      client.commands.set(alias, command);
    });
  }
});

// https://gist.github.com/wilensky/30780b42cc1978aed378
const mkdirSyncRecursive = (directory: string): void => {
  const path = directory.replace(/\/$/, '').split('/');
  for (var i = 1; i <= path.length; i++) {
    const segment = path.slice(0, i).join('/');
    segment.length > 0 && !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
  }
};

// Set name of base folder based on whether it's dev or production.
// Possible values: 'src' or 'built'
const baseFolder = path.basename(__dirname);
const dbFolder = `${baseFolder}/data/`;
const dbFile = `${baseFolder}/data/database.sqlite`;
mkdirSyncRecursive(dbFolder);

const exists = fs.existsSync(dbFile);
console.log(exists);
const db = new sqlite3.Database(dbFile);

db.serialize((): void => {
  db.run('CREATE TABLE IF NOT EXISTS server (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT)');
  console.log('Database files initialized');
});

fs.readdir(path.resolve(__dirname, './events'), (err: unknown, files: string[]): void => {
  files.forEach((file): void => {
    const eventFunction = require(`./events/${file}`).default;
    const eventName: string = file.split('.')[0];

    client.on(eventName, (...args: string[]): void => eventFunction(client, ...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

// Bot loaded message
client.once('ready', (): void => {
  console.log('Ready!');
});

// Message Handler
client.on('message', (message: Discord.Message): void => {
  // Don't fuss with bots who check for pings.
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Provide arguments for the system to work.
  const args = message.content.slice(prefix.length).split(/ +/);
  // Make the command case insensitive.
  // Need to add ! to tell TypeScript that the args is defined.
  const firstArg = args.shift();
  if (!firstArg) return;
  const commandName = firstArg.toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    // Get command name, and execute it in the commands directory.
    command.execute(message, args, client);
  } catch (e) {
    console.error(e);
    message.channel.send('Error: View console log for more details.');
  }
});

// -- Login Bot
client.login(config.token);