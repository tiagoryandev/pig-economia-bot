const InteractionCreateEvent  = {
	eventType: "interactionCreate",
	execute: async (client, interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		command.execute(client, interaction);
	}
};

module.exports = InteractionCreateEvent;