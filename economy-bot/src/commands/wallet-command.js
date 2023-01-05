const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("wallet")
		.setDescription("Wallet Command.")
};