const Discord = require("discord.js");

const WalletCommand = {
	data: new Discord.SlashCommandBuilder()
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

module.exports = WalletCommand;