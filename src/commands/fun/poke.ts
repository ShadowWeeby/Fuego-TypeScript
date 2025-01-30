/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';
import { randomNekoImage } from '../../functions/randomNekoImage.js';

export default class Poke extends Command {
  override slash = false;
  override usage = '[member]';
  description = 'poke someone';

  async execute(client: ExtendedClient, ctx: Context) {
    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(`${ctx.author} poked ${ctx.mentions.users?.first() || `some random weirdo`}`)
          .img(await randomNekoImage(this.name)),
      ],
    });
  }
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
