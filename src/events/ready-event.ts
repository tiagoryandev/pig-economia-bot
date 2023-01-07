import chalk from "chalk";

import { EventBase } from "../interfaces/event-base";

const ReadyEvent: EventBase<"ready"> = {
	eventType: "ready",
	execute: async client => {
		client.user.setPresence({
			activities: [
				{
					name: "Andromni | By: tiagoryandev"
				}
			]
		});

		console.log(chalk.bold.yellow("✓ Andromni Bot is Running."));
	}
};

export default ReadyEvent;