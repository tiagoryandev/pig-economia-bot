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