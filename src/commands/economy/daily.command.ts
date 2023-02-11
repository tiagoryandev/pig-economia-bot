import { SlashCommandBuilder } from "discord.js";

import { SlashCommandBase } from "../../interfaces/slash-command-base.interface";

const WalletCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("daily")
		.setDescription("💰 Pegue sua remuneração diária."),
	execute: async (client, interaction) => {
		await interaction.reply({
			content: "Remuneração Diária."
		});
	}
};

export default WalletCommand;