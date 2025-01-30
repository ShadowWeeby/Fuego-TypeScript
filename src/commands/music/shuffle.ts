/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class Shuffle extends Command {
  override playing = true;
  override inSameVC = true;

  override aliases = ['sh'];
  override description = 'Shuffle the queue';

  override execute = async (client: ExtendedClient, ctx: Context) => {
    client.getPlayer(ctx)!.queue.shuffle();

    await ctx.reply({
      embeds: [client.embed().desc(`${client.emoji.check} Shuffled the queue.`)],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
