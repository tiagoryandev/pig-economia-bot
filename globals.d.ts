import { Collection } from "discord.js";

import { SlashCommandBase } from "./src/interfaces/slash-command-base.interface";

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {
      // NodeJS Environments
			NODE_ENV: "development" | "production";
			
			// Discord Credentials
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_TOKEN: string;
      DISCORD_GUILD_ID: string;
    }
  }
}

export declare module "discord.js" {
  export interface Client {
    commands: Collection<string, SlashCommandBase>;
  }
}