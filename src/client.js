const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

const config = require("../config.json");

class DiscordApplication {
	constructor() {
		this.client = new Discord.Client({
			intents: [
				Discord.GatewayIntentBits.Guilds,
				Discord.GatewayIntentBits.GuildMessages,
				Discord.GatewayIntentBits.MessageContent,
				Discord.GatewayIntentBits.GuildMembers
			]
		});
    
		this.client.commands = new Discord.Collection();
		this.loadEvents();
		this.loadSlashCommands();
		this.client.login(config.clientToken);
	}

	async loadEvents() {
		const eventFolder = fs.readdirSync(path.resolve(__dirname, "events"));

		for (const file of eventFolder) {
			const event = require(`./events/${file}`);

			this.client.on(event.eventType, event.execute.bind(null, this.client));
		}
	}

	async loadSlashCommands() {
		const folders = fs.readdirSync(path.resolve(__dirname, "commands"));
		
		for (const folder of folders) {
			const commandFolder = fs.readdirSync(path.resolve(__dirname, "commands", folder));
	
			for (const file of commandFolder) {
				const command = require(`./commands/${folder}/${file}`);
			
				this.client.commands.set(command.data.toJSON().name, command);
			}
		}
	}
}

module.exports = DiscordApplication;