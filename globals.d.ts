import { Collection } from "discord.js";

import { SlashCommandBase } from "./src/interfaces/slash-command-base";

export declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {
      NODE_ENV: "development" | "production";
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