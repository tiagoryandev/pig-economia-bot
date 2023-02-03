const fs = require("fs");
const path = require("path");
const Discord = require("discord.js");
const mongoose = require("mongoose");

const loadEvents = require("");
const config = require("../config.json");

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMembers
	]
});

client.commands = new Discord.Collection();

const loadCommands = () => {
	const folders = fs.readdirSync(path.resolve(__dirname, "commands"));
		
	for (const folder of folders) {
		const commandFolder = fs.readdirSync(path.resolve(__dirname, "commands", folder));
	
		for (const file of commandFolder) {
			const command = require(`./commands/${folder}/${file}`);
			
			this.client.commands.set(command.data.toJSON().name, command);
		}
	}
};

client.login(config.client_token);



// class DiscordApplication {
// 	constructor() {
// 		this.client = new Discord.Client({
// 			intents: [
// 				Discord.GatewayIntentBits.Guilds,
// 				Discord.GatewayIntentBits.GuildMessages,
// 				Discord.GatewayIntentBits.MessageContent,
// 				Discord.GatewayIntentBits.GuildMembers
// 			]
// 		});
    
// 		this.client.commands = new Discord.Collection();
// 		this.loadEvents();
// 		this.loadSlashCommands();
// 		this.connectDatabase();
// 		this.client.login(config.clientToken);
// 	}

// 	async loadEvents() {
// 		const eventFolder = fs.readdirSync(path.resolve(__dirname, "events"));

// 		for (const file of eventFolder) {
// 			const event = require(`./events/${file}`);

// 			this.client.on(event.eventType, event.execute.bind(null, this.client));
// 		}
// 	}

// 	async loadSlashCommands() {
// 		const folders = fs.readdirSync(path.resolve(__dirname, "commands"));
		
// 		for (const folder of folders) {
// 			const commandFolder = fs.readdirSync(path.resolve(__dirname, "commands", folder));
	
// 			for (const file of commandFolder) {
// 				const command = require(`./commands/${folder}/${file}`);
			
// 				this.client.commands.set(command.data.toJSON().name, command);
// 			}
// 		}
// 	}

// 	async connectDatabase() {
// 		mongoose.Promise = global.Promise;
// 		mongoose.set("strictQuery", true);

// 		mongoose.connect(config.mongodb.url, {
// 			authSource: "admin",
// 			user: config.mongodb.username,
// 			pass: config.mongodb.password
// 		});
// 	}
// }

// module.exports = DiscordApplication;