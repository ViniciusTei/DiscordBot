import { Client, Collection, GatewayIntentBits } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'

import config from '../config.json' assert { type: 'json' }
import handlers from './utils/handlers.js'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//load commands
client.commands = new Collection();
const commands = await handlers.commandHandler();
for (const command of commands) {
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command is missing a required "data" or "execute" property.`);
  }
}

//load events
const events = await handlers.eventsHandler()
for (const event of events) {
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.BOT_TOKEN || config.token);
