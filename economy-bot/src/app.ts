import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
	dotenv.config();
}

import { DiscordApplication } from "./client";

new DiscordApplication();