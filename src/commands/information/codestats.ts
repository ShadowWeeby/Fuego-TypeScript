/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import _ from 'lodash';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { paginator } from '../../utils/paginator.js';
import { Context } from '../../interfaces/context.js';
import { getCodeStats } from '../../utils/codestats.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';
import { ExtendedEmbedBuilder } from '../../classes/embed.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default class Codestats extends Command {
  override aliases = ['cs'];
  description = 'Shows codestats & tree';

  execute = async (client: ExtendedClient, ctx: Context) => {
    const data = await getCodeStats();
    const pages: ExtendedEmbedBuilder[] = [];
    const dirTree = data.tree;
    const metadata = JSON.parse(
      await readFile(resolve(__dirname, '../../../package.json'), 'utf8'),
    );
    const mapping = _.chunk(dirTree, 26);
    const descriptions = mapping.map((chunks) => chunks.join('\n'));
    const codeStats = client
      .embed()
      .desc(
        `${client.emoji.check} **Codestats**\n\n` +
          `${client.emoji.info} **Total files :** ${data.files}\n` +
          `${client.emoji.info} **Total directories :** ${data.directories}\n` +
          `${client.emoji.info} **Total lines :** ${data.lines}\n` +
          `${client.emoji.info} **Total whitespaces :** ${data.whitespaces}\n` +
          `${client.emoji.info} **Total characters :** ${data.characters}\n`,
      )
      .footer({
        text: `Page : 1 / ${descriptions.length + 4} - This is the basic codeStats for Fuego v1.0.0. This data ignores hidden files.`,
      });
    const dependencies = client
      .embed()
      .desc(
        `${client.emoji.check} **Dependencies**\n\n` +
          Object.entries(metadata.dependencies)
            .map(
              ([pkg, version]) =>
                `${client.emoji.info} **${pkg} :** ${`${version}`.replace('^', 'v')}`,
            )
            .join('\n'),
      )
      .footer({
        text: `Page : 2 / ${descriptions.length + 4} - This is the list of dependencies/packages used in the making of Fuego v1.0.0.`,
      });
    const devDependencies = client
      .embed()
      .desc(
        `${client.emoji.check} **Dev-Dependencies**\n\n` +
          Object.entries(metadata.devDependencies)
            .map(
              ([pkg, version]) =>
                `${client.emoji.info} **${pkg} :** ${`${version}`.replace('^', 'v')}`,
            )
            .join('\n'),
      )
      .footer({
        text: `Page : 3 / ${descriptions.length + 4} - This is the list of developer/dev-dependencies in the making of Fuego v1.0.0.`,
      });
    const scripts = client
      .embed()
      .desc(
        `${client.emoji.check} **Scripts**\n\n` +
          Object.entries(metadata.scripts)
            .map(([name, script]) => `${client.emoji.info} **${name} :** ${script}`)
            .join('\n'),
      )
      .footer({
        text: `Page : 4 / ${descriptions.length + 4} - This is the list of executable scripts given by Fuego v1.0.0 's package.json.`,
      });
    for (let i = 0; i < descriptions.length; i++)
      pages.push(
        client
          .embed()
          .desc(
            `${client.emoji.check} **Directory tree**\n\n` + `\`\`\`\n${descriptions[i]}\n\`\`\``,
          )
          .footer({
            text: `Page : ${i + 5} / ${descriptions.length + 4} - This is the directory tree for Fuego v1.0.0. The numbers indicate line count.`,
          }),
      );
    await paginator(ctx, [codeStats, dependencies, devDependencies, scripts, ...pages]);
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
