import { SlashCommandBuilder } from "discord.js";

import prisma from "../../libs/prisma";
import { SlashCommandBase } from "../../interfaces/slash-command-base.interface";
import { formatCurrency } from "../../helpers/format-values";

const WalletCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("carteira")
		.setDescription("💰 Veja as informações monetárias de sua carteira.")
		.addUserOption(input =>
			input
				.setName("usuário")
				.setDescription("Usuário que você deseja ver as informações monetárias.")
		),
	execute: async (client, interaction) => {
		const user = interaction.options.getUser("usuário") || interaction.user;

		let userData = await prisma.users.findUnique({
			where: {
				id: user.id,
			}
		});

		if (!userData) {
			userData = await prisma.users.create({
				data: {
					id: user.id,
					userTag: user.tag
				}
			});
		}

		const wallet = Number(userData.wallet) / 100;
		const bank = Number(userData.bank) / 100;

		await interaction.reply({
			content: [
				`:money_with_wings: **|** Informações monetárias de ${user.toString()}:`,
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