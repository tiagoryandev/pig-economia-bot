import { SlashCommandBuilder } from "discord.js";
import { formatCurrency } from "../../helpers/format-values";

import { SlashCommandBase } from "../../interfaces/slash-command-base.interface";
import prisma from "../../libs/prisma";

const WalletCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("daily")
		.setDescription("💰 Pegue sua remuneração diária."),
	execute: async (client, interaction) => {
		const timeoutDaily = 43200000; // 12 hors

		const userData = await prisma.users.findFirst({
			where: {
				id: interaction.user.id
			}
		});

		if (userData && userData.lastDaily && timeoutDaily - (Date.now() - userData.lastDaily.getTime()) > 0) {
			await interaction.reply({
				content: [
					`:alarm_clock: **|** ${interaction.user.toString()}, você já recebeu a sua remuração diária.`,
					"",
					`*Próxima remuneração: <t:${Math.floor((userData.lastDaily.getTime() + timeoutDaily) / 1000)}:R>*`
				].join("\n")
			});

			return;
		}

		const dailyValue = Math.floor(Math.random() * 100000) + 10000;
			
		await prisma.users.upsert({
			where: {
				id: interaction.user.id
			},
			create: {
				id: interaction.user.id,
				userTag: interaction.user.tag,
				wallet: dailyValue,
				lastDaily: new Date()
			},
			update: {
				wallet: {
					increment: dailyValue
				},
				lastDaily: new Date()
			}
		});

		await interaction.reply({
			content: [
				`:moneybag: **|** ${interaction.user.toString()}, você recebeu \`${formatCurrency(dailyValue / 100)}\` de remuneração diária.`,
				"",
				`*Próxima remuneração: <t:${Math.floor((Date.now() + timeoutDaily) / 1000)}:R>*`
			].join("\n")
		});
	}
};

export default WalletCommand;