const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

const config = require("../config.json");

const deployCommands = async () => {
	const commands = [];
	const folders = fs.readdirSync(path.resolve(__dirname, "commands"));
	const rest = new Discord.REST({ version: "10" }).setToken(config.clientToken);

	for (const folder of folders) {
		const commandFolder = fs.readdirSync(path.resolve(__dirname, "commands", folder));

		for (const file of commandFolder) {
			const command = require(`./commands/${folder}/${file}`);
		
			commands.push(command.data.toJSON());
		}
	}

	const fullRoute = Discord.Routes.applicationGuildCommands(
		config.clientId,
		config.guildId
	);

	await rest.put(fullRoute, {
		body: commands
	});
};

deployCommands();