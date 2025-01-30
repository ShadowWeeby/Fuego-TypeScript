/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { ExtendedClient } from '../classes/client.js';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Command } from '../classes/abstract/command.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const loadCommands = async (client: ExtendedClient) => {
  let totalCommandCount = 0;

  for (const category of await readdir(resolve(__dirname, '../commands'))) {
    for (const file of await readdir(resolve(__dirname, '../commands', category))) {
      if (!file.endsWith('.js')) continue;

      const command = new (
        await import(pathToFileURL(resolve(__dirname, '../commands', category, file)).href)
      ).default() as Command;

      command.category = category.toLowerCase();
      command.name = file.split('.')[0].toLowerCase();
      command.nsfw = category === 'nsfw' ? true : false;
      command.owner = category === 'owner' ? true : false;

      client.commands.set(command.name, command);

      totalCommandCount++;
    }
  }
  client.log(`Loaded ${totalCommandCount} message commands`, 'success');
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
