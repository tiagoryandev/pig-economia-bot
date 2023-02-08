import chalk from "chalk";

import { EventBase } from "../interfaces/event-base.interface";

const ReadyEvent: EventBase<"ready"> = {
	eventType: "ready",
	execute: async client => {
		client.user.setPresence({
			activities: [
				{
					name: "Pig Economia | By: TiagoRyanDev#9903"
				}
			]
		});

		console.log(chalk.bold.yellow("✓ Pig Economia foi iniciado com sucesso."));
	}
};

export default ReadyEvent;