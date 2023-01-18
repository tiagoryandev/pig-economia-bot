import chalk from "chalk";

import { EventBase } from "../interfaces/event-base";

const ReadyEvent: EventBase<"ready"> = {
	eventType: "ready",
	execute: async client => {
		client.user.setPresence({
			activities: [
				{
					name: "Pig Economia | By: tiagoryandev"
				}
			]
		});

		console.log(chalk.bold.yellow("✓ Pig Economia foi iniciado com Sucesso."));
	}
};

export default ReadyEvent;