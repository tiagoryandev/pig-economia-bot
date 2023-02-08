import {
	Client,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	Awaitable
} from "discord.js";

export interface SlashCommandBase {
  data: SlashCommandBuilder;
  execute: (client: Client<true>, interaction: ChatInputCommandInteraction) => Awaitable<void>;
}