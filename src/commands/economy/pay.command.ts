import { SlashCommandBuilder } from "discord.js";

import { SlashCommandBase } from "../../interfaces/slash-command-base.interface";

const PayCommand: SlashCommandBase = {
	data: new SlashCommandBuilder()
		.setName("pagar")
		.setDescription("💰 Realize pagamentos para outros usuários.")
		.addUserOption(input =>
			input
				.setName("destinatário")
				.setDescription("Usuário que você deseja enviar o pagamento.")
				.setRequired(true)
		)
		.addNumberOption(input =>
			input
				.setName("valor")
				.setDescription("Valor que será enviado no pagamento.")
				.setMinValue(1)),
	execute: async (client, interaction) => {
		await interaction.reply({
			content: "pagado"
		});
	}
};

export default PayCommand;