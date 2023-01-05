import fs from "fs";
import path from "path";
import Discord from "discord.js";

import { EventBase } from "./interfaces/event-base";

export class DiscordApplication {
	private client: Discord.Client<true>;

	constructor() {
		this.client = new Discord.Client({
			intents: [
				Discord.GatewayIntentBits.Guilds,
				Discord.GatewayIntentBits.GuildMessages,
				Discord.GatewayIntentBits.MessageContent,
				Discord.GatewayIntentBits.GuildMembers
			]
		});
    
		this.loadEvents();
		this.client.login(process.env.DISCORD_CLIENT_TOKEN);
	}

	private async loadEvents() {
		const eventFolder = fs.readdirSync(path.resolve(__dirname, "events"));

		for (const file of eventFolder) {
			const event: EventBase<any> = (await import(path.resolve(__dirname, "events", file))).default;

			this.client.on(event.eventType, event.execute.bind(null, this.client));
		}
	}
}