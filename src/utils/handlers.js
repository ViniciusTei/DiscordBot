import { fileURLToPath } from 'url'
import fs from 'node:fs'
import path from 'node:path'

const commandHandler = async () => {
  const commands = [];
  // Grab all the command folders from the commands directory you created earlier
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const foldersPath = path.join(__dirname, '..', 'commands');

  const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const response = await import(filePath);
    const command = response.default
    if ('data' in command && 'execute' in command) {
      commands.push(command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  return commands
}

const eventsHandler = async () => {
  const events = []

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const foldersPath = path.join(__dirname, '..', 'events');
  const eventsFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
  
  for (const file of eventsFiles) {
    const filePath = path.join(foldersPath, file);
    const response = await import(filePath);
    const event = response.default
    if ('name' in event && 'execute' in event) {
      events.push(event);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "name" or "execute" property.`);
    }
  }

  return events
}

export default {
  commandHandler,
  eventsHandler
}

