const ReadyEvent = {
	eventType: "ready",
	execute: async client => {
		client.user.setPresence({
			activities: [
				{
					name: "Pig Economia | By: tiagoryandev"
				}
			]
		});
	}
};

module.exports = ReadyEvent;