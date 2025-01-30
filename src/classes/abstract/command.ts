/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { ExtendedClient } from '../client.js';
import { Args } from '../../interfaces/args.js';
import { PermissionResolvable } from 'discord.js';
import { Context } from '../../interfaces/context.js';

export type options = {
  name: string;
  required: boolean;
  description: string;
  isAutoComplete?: boolean;
  choices?: { name: string; value: string }[];
  opType: 'user' | 'role' | 'string' | 'number' | 'boolean' | 'channel' | 'attachment';
};

export abstract class Command {
  usage = '';

  nsfw = false;
  admin = false;
  owner = false;

  inVC = false;
  inSameVC = false;

  player = false;
  playing = false;

  cooldown = 5;
  aliases: string[] = [];

  slash = true;
  options: options[] = [];

  abstract description: string;

  userPerms: PermissionResolvable[] = [];

  /** Assigned dynamically when loading ( `file.name.toLowerCase()` ) */
  name = '';
  /** Assigned dynamically when loading ( `folder.name.toLowerCase()` ) */
  category = '';

  abstract execute(client: ExtendedClient, ctx: Context, args?: Args): Promise<unknown>;
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
