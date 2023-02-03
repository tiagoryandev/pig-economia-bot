const fs = require("fs");
const path = require("path");

const loadEvents = client => {
	const eventFolder = fs.readdirSync(path.resolve(__dirname, "..", "events"));
	
	for (const file of eventFolder) {
		const event = require(`../events/${file}`);
	
		client.on(event.eventType, event.execute.bind(null, this.client));
	}
};

module.exports = loadEvents;