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
    
		this.start();
	}

	start() {
		this.client.login().then(() => {
			console.log(this.client.user);
		});
	}
}

module.exports = DiscordClient;