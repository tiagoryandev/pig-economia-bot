const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");

class DiscordClient {
	constructor() {
		this.client = new Discord.Client({
			intents: [
				Discord.GatewayIntentBits.Guilds,
				Discord.GatewayIntentBits.GuildMessages,
				Discord.GatewayIntentBits.MessageContent,
				Discord.GatewayIntentBits.GuildMembers
			]
		});
    
		this.#loadEvents();
		this.client.login();
	}

	#loadEvents() {
		const events = fs.readdirSync(path.resolve(__dirname, "events"));

		events.forEach(eventFile => {
			const { eventName, handler } = require(path.resolve(__dirname, "events", eventFile));

			this.client.on(eventName, handler.bind(null, this.client));
		});
	}
}

module.exports = DiscordClient;