import { SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("wallet")
		.setDescription("Wallet Command.")
};