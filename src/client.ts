import fs from "fs";
import path from "path";
import Discord from "discord.js";

import { EventBase } from "./interfaces/event-base.interface";
import { SlashCommandBase } from "./interfaces/slash-command-base.interface";

export class DiscordClient {
	private client: Discord.Client<true>;

	constructor() {
		this.client = new Discord.Client({
			intents: [
				Discord.GatewayIntentBits.Guilds,
				Discord.GatewayIntentBits.GuildMembers
			]
		});

		this.client.commands = new Discord.Collection();

		this.loadEvents();
		this.loadSlashCommands();
		
		this.client.login(process.env.DISCORD_CLIENT_TOKEN);
	}

	private async loadEvents() {
		const eventFolder = fs.readdirSync(path.resolve(__dirname, "events"));

		for (const file of eventFolder) {
			const event: EventBase<any> = (await import(path.resolve(__dirname, "events", file))).default;

			this.client.on(event.eventType, event.execute.bind(null, this.client));
		}
	}

	private async loadSlashCommands() {
		const folders = fs.readdirSync(path.resolve(__dirname, "commands"));
		
		for (const folder of folders) {
			const commandFolder = fs.readdirSync(path.resolve(__dirname, "commands", folder));
	
			for (const file of commandFolder) {
				const command: SlashCommandBase = (await import(path.resolve(__dirname, "commands", folder, file))).default;
			
				this.client.commands.set(command.data.toJSON().name, command);
			}
		}
	}
}