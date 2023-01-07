import { EventBase } from "../interfaces/event-base";

const ReadyEvent: EventBase<"interactionCreate"> = {
	eventType: "interactionCreate",
	execute: async (client, interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		command.execute(client, interaction);
	}
};

export default ReadyEvent;