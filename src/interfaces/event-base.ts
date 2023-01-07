import { Client, ClientEvents, Awaitable } from "discord.js";

export interface EventBase<K extends keyof ClientEvents> {
  eventType: K;
  execute: (client: Client<true>, ...args: ClientEvents[K]) => Awaitable<void>;
}