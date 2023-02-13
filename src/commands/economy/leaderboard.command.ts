import { SlashCommandBuilder } from "discord.js";

import prisma from "../../libs/prisma";
import { SlashCommandBase } from "../../interfaces/slash-command-base.interface";
import { formatCurrency } from "../../helpers/format-values";

const LeaderboardCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("rank")
		.setDescription("💰 Veja os usuários mais ricos."),
	execute: async (client, interaction) => {
		const usersList = await prisma.users.findMany({
			take: 10
		});

		const usersSortted = usersList.sort((a, b) => a.wallet + a.bank < b.wallet + b.bank ? 1 : -1);

		await interaction.reply({
			content: [
				`:bank: **|** ${interaction.user.toString()}, veja a lista dos usuários mais ricos:`,
				...usersSortted.map((user, index) => {
					const currency = formatCurrency(Number(user.wallet + user.bank) / 100);
	
					return `> \`${index + 1}º\` **| ${user.userTag}** - \`${currency}\``;
				})
			].join("\n")
		});
	}
};

export default LeaderboardCommand;