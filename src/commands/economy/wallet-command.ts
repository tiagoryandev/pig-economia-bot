import { SlashCommandBuilder } from "discord.js";

import { SlashCommandBase } from "../../interfaces/slash-command-base";

const WalletCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("carteira")
		.setDescription("💰 Veja as informações monetárias de sua carteira."),
	execute: async (client, interaction) => {
		const currency = Math.floor(Math.random() * 10000) + 1000;
		const currencyFormated = currency.toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL",
			minimumFractionDigits: 2
		});

		await interaction.reply({
			content: `💰 **|** Você tem na sua cateria atualmente **${currencyFormated}**.`
		});
	}
};

export default WalletCommand;