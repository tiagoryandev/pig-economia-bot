import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

import { DiscordClient } from "./client";

new DiscordClient();