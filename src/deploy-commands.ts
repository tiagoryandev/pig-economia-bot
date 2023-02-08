import fs from "fs";
import path from "path";
import chalk from "chalk";
import dotenv from "dotenv";
import { REST, Routes } from "discord.js";

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

import { SlashCommandBase } from "./interfaces/slash-command-base.interface";

const deployCommands = async () => {
	const commands = [];
	const folders = fs.readdirSync(path.resolve(__dirname, "commands"));
	const rest = new REST({
		version: "10"
	});
	
	rest.setToken(process.env.DISCORD_CLIENT_TOKEN);

	for (const folder of folders) {
		const commandFolder = fs.readdirSync(path.resolve(__dirname, "commands", folder));

		for (const file of commandFolder) {
			const commandFile = await import(path.resolve(__dirname, "commands", folder, file));
			const command: SlashCommandBase = commandFile.default;
		
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
	.then(() => console.log(chalk.bold.yellow("✓ Todos os comandos foram registrados com sucesso!")))
	.catch(error => console.log(chalk.bold.red("× Ocorreu um problema ao registrar os comandos:"), chalk.gray(error.message)));