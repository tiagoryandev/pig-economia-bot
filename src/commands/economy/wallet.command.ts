import { SlashCommandBuilder } from "discord.js";

import prisma from "../../libs/prisma";
import { SlashCommandBase } from "../../interfaces/slash-command-base.interface";

const WalletCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("carteira")
		.setDescription("💰 Veja as informações monetárias de sua carteira."),
	execute: async (client, interaction) => {
		let userData = await prisma.users.findUnique({
			where: {
				id: interaction.user.id,
			}
		});

		if (!userData) {
			userData = await prisma.users.create({
				data: {
					id: interaction.user.id,
					userTag: interaction.user.tag
				}
			});
		}

		const currency = userData.wallet;
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