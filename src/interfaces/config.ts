/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { ColorResolvable } from 'discord.js';

export interface Config {
  token: string;
  prefix: string;
  links: {
    support: string;
  };
  admins: string[];
  owners: string[];
  color: ColorResolvable;
  webhooks: WebhookConfig;
}

export interface WebhookConfig {
  blLogs: string;
  cmdLogs: string;
  guildLogs: string;
  playerLogs: string;
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
