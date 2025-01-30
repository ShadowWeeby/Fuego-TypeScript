/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class Metadata extends Command {
  description = 'Shows app metadata';
  override aliases = ['bi', 'meta', 'botinfo', 'info', 'about'];

  execute = async (client: ExtendedClient, ctx: Context) => {
    const metadata = JSON.parse(
      await readFile(resolve(__dirname, '../../../package.json'), 'utf8'),
    );

    await ctx.reply({
      embeds: [
        client
          .embed()

          .desc(
            `${client.emoji.check} **Metadata ( CKS-${metadata.checksum} )**\n\n` +
              `${client.emoji.info} **Project Name :** ${metadata.name}\n` +
              `${client.emoji.info} **Version :** ${metadata.version}\n` +
              `${client.emoji.info} **Description :** ${metadata.description}\n` +
              `${client.emoji.info} **Author :** ${metadata.author}\n` +
              `${client.emoji.info} **License :** ${metadata.license}\n` +
              `${client.emoji.info} **Repository URL :** ${metadata.repository.url}\n` +
              `${client.emoji.info} **Bug Report URL :** ${metadata.bugs.url}\n` +
              `${client.emoji.info} **Contact Email :** ${metadata.contact_email}\n`,
          ),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
