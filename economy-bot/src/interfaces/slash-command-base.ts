import { SlashCommandBuilder, Awaitable } from "discord.js";

export interface SlashCommandBase {
  data: SlashCommandBuilder;
  execute: () => Awaitable<void>;
}