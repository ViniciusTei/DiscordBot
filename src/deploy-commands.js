import { REST, Routes } from 'discord.js'
import config from '../config.json' assert { type: 'json' }
import handlers from './utils/handlers.js'

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.token);

// and deploy your commands!
(async () => {
	try {
    const commandsRaw = await handlers.commandHandler();
    const commands = commandsRaw.map(com => com.data.toJSON());
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(config.clientId, config.guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
