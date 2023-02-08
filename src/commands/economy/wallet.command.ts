import { SlashCommandBuilder } from "discord.js";

import prisma from "../../libs/prisma";
import { SlashCommandBase } from "../../interfaces/slash-command-base.interface";
import { formatCurrency } from "../../helpers/format-values";

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

		const wallet = Number(userData.wallet) / 100;
		const bank = Number(userData.bank) / 100;

		await interaction.reply({
			content: [
				`:money_with_wings: **|** ${interaction.user.toString()}, seus dados monetários atuais:`,
				`> :moneybag: **Carteira:** \`${formatCurrency(wallet)}\``,
				`> :bank: **Banco:** \`${formatCurrency(bank)}\``,
				`> :scales: **Patrimônio Total:** \`${formatCurrency(wallet + bank)}\``,
				"",
				`*Ultima atualização: <t:${Math.floor(userData.updatedAt.getTime() / 1000)}:R>*`
			].join("\n")
		});
	}
};

export default WalletCommand;