import { EventBase } from "../interfaces/event-base";

const ReadyEvent: EventBase<"ready"> = {
	eventType: "ready",
	execute: async client => {
		client.user.setPresence({
			activities: [
				{
					name: "Discord Bot Economy | By: tiagoryandev"
				}
			]
		});

		console.log("Discord Application is Running...");
	}
};

export default ReadyEvent;