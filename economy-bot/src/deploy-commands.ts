import "dotenv/config";

import fs from "fs";
import path from "path";
import { REST, Routes } from "discord.js";

import { SlashCommandBase } from "./interfaces/slash-command-base";

const commands = [];
const commandFolder = fs.readdirSync(path.resolve(__dirname, "commands"));
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_CLIENT_TOKEN);

(async () => {
	for (const file of commandFolder) {
		const command: SlashCommandBase = (await import(path.resolve(__dirname, "commands", file))).default;
		
		commands.push(command.data.toJSON());
	}

	try {
		const fullRoute = Routes.applicationGuildCommands(
			process.env.DISCORD_CLIENT_ID,
			process.env.DISCORD_GUILD_ID
		);

		await rest.put(fullRoute, {
			body: commands
		});
	} catch (error) {
		console.error(error);
	}
})();