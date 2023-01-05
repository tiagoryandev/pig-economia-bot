require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const commands = [];
const commandFiles = fs.readdirSync(path.resolve(__dirname, "commands"));

for (const file of commandFiles) {
	const command = require(path.resolve(__dirname, "commands", file));

	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const deployCommands = async () => {
	try {
		const fullRoute = Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID);
		const options = {
			body: commands
		};
    
		await rest.put(fullRoute, options);
	} catch (error) {
		console.error(error);
	}
};

deployCommands();