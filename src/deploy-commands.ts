import "dotenv/config";

import fs from "fs";
import path from "path";
import chalk from "chalk";
import dotenv from "dotenv";
import { REST, Routes } from "discord.js";

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

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
	.then(() => console.log(chalk.bold.yellow("✓ All slash commands have been deployed successfully!")))
	.catch(error => console.log(chalk.bold.red("× A problem occurred while deploying the slash commands:"), chalk.gray(error.message)));