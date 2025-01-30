/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { getRandomPost } from '../../functions/reddit.js';
import { Command } from '../../classes/abstract/command.js';

export default class Thoughts extends Command {
  override aliases = ['thoughts'];
  description = 'Shows random thoughts';

  async execute(client: ExtendedClient, ctx: Context) {
    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(`${client.emoji.info} ${(await getRandomPost('showerthoughts')).title}`),
      ],
    });
  }
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
