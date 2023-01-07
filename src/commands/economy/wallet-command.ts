import { SlashCommandBuilder } from "discord.js";

import { SlashCommandBase } from "../../interfaces/slash-command-base";

const WalletCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("wallet")
		.setDescription("💰 See all your wallet's monetary information."),
	execute: async (client, interaction) => {
		const currency = Math.floor(Math.random() * 10000) + 1000;
		const currencyFormated = currency.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2
		});

		await interaction.reply({
			content: `💰 **|** you currently have **${currencyFormated}** in your wallet`
		});
	}
};

export default WalletCommand;