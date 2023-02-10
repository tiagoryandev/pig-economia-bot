import {
	Client,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	Awaitable
} from "discord.js";

export interface SlashCommandBase {
	data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (client: Client<true>, interaction: ChatInputCommandInteraction) => Awaitable<void>;
}