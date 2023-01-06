import { SlashCommandBuilder } from "discord.js";

import { SlashCommandBase } from "../interfaces/slash-command-base";

export default {
	data: new SlashCommandBuilder()
		.setName("wallet")
		.setDescription("Wallet Command"),
	execute: async (client, interaction) => {
		await interaction.reply("Do you not have wallet");
	}
} as SlashCommandBase;