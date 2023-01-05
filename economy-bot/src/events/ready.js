module.exports = {
	eventName: "ready",
	handler: client => {
		client.user.setPresence({
			activities: [
				{ name: "Modern Discord Application | By: tiagoryandev" }
			]
		});
	}
};