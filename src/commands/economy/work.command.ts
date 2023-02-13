import { SlashCommandBuilder } from "discord.js";
import { formatCurrency } from "../../helpers/format-values";

import { SlashCommandBase } from "../../interfaces/slash-command-base.interface";
import prisma from "../../libs/prisma";

const WorkCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("trabalhar")
		.setDescription("💰 Trabalhe para receber sua remuneração."),
	execute: async (client, interaction) => {
		const timeoutWork = 3600000; // 12 hors

		const userData = await prisma.users.findFirst({
			where: {
				id: interaction.user.id
			}
		});

		if (userData && userData.lastWork && timeoutWork - (Date.now() - userData.lastWork.getTime()) > 0) {
			await interaction.reply({
				content: `:alarm_clock: **|** ${interaction.user.toString()}, você já trabalhou! Seu próximo trabalho será <t:${Math.floor((userData.lastWork.getTime() + timeoutWork) / 1000)}:R>`
			});

			return;
		}

		const workValue = Math.floor(Math.random() * 5000) + 1000;
			
		await prisma.users.upsert({
			where: {
				id: interaction.user.id
			},
			create: {
				id: interaction.user.id,
				userTag: interaction.user.tag,
				wallet: workValue,
				lastWork: new Date()
			},
			update: {
				wallet: {
					increment: workValue
				},
				lastWork: new Date()
			}
		});

		await interaction.reply({
			content: [
				`:moneybag: **|** ${interaction.user.toString()}, você recebeu \`${formatCurrency(workValue / 100)}\` de remuneração por trabalhar.`,
				"",
				`*Próximo trabalho: <t:${Math.floor((Date.now() + timeoutWork) / 1000)}:R>*`
			].join("\n")
		});
	}
};

export default WorkCommand;