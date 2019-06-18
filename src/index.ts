// -- Environment stuff
import * as fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import config from './config.json';
import Discord from 'discord.js';
import { Command } from './@types/bot';
dotenv.config();

const prefix = config.prefix;

// Module augmentation to extend Discord.Client with "commands" property
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Load command files
const commandFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter((file: string): RegExpMatchArray | null => file.match(/(\.js|\.ts)/));
commandFiles.forEach((file: string): void => {
  const command = require(path.resolve(__dirname, `./commands/${file}`)).default as Command;
  client.commands.set(command.name, command);

  // Clone additional commands in client.commands if the current command has aliases.
  command.aliases.forEach((alias): void => {
    client.commands.set(alias, command);
  });
});

// Database stuff
const dbFile = './data/database.sqlite';
const exists = fs.existsSync(dbFile);
const db = new sqlite3.Database(dbFile);

db.serialize((): void => {
  if (!exists) {
    db.run('CREATE TABLE IF NOT EXISTS server (serverID TEXT, moderatorID TEXT, moderationChannel TEXT, mutedRoleID TEXT)');
    console.log('Database not found.  Creating new database.');
  }
  console.log('Database files initialized');
});

fs.readdir('./events', (err: unknown, files: string[]): void => {
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
client.login(process.env.BOT_TOKEN);
