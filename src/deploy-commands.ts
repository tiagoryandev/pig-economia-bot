import "dotenv/config";

import fs from "fs";
import path from "path";
import { REST, Routes } from "discord.js";

import { SlashCommandBase } from "./interfaces/slash-command-base";

const deployCommands = async () => {
	const commands = [];
	const folders = fs.readdirSync(path.resolve(__dirname, "commands"));
	const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_CLIENT_TOKEN);

	for (const folder of folders) {
		const commandFolder = fs.readdirSync(path.resolve(__dirname, "commands", folder));

		for (const file of commandFolder) {
			const command: SlashCommandBase = (await import(path.resolve(__dirname, "commands", folder, file))).default;
		
			commands.push(command.data.toJSON());
		}
	}

	const fullRoute = Routes.applicationGuildCommands(
		process.env.DISCORD_CLIENT_ID,
		process.env.DISCORD_GUILD_ID
	);

	await rest.put(fullRoute, {
		body: commands
	});
};

deployCommands()
	.then(() => console.log("All Commands as Deployeds"))
	.catch(error => console.log("Error", error));