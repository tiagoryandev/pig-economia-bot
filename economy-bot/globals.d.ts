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