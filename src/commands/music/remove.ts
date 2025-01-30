/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Args } from '../../interfaces/args.js';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command, options } from '../../classes/abstract/command.js';

export default class Remove extends Command {
  override playing = true;
  override inSameVC = true;
  override usage = '<position>';
  override description = 'Remove song from queue';

  override options: options[] = [
    {
      required: true,
      opType: 'string',
      name: 'position',
      description: 'which song to remove',
    },
  ];

  override execute = async (client: ExtendedClient, ctx: Context, args: Args) => {
    const player = client.getPlayer(ctx);

    const position = Number(args[0]) - ((player?.queue.previous.length || 0) + 1);
    const track = player!.queue[position];

    if (position > player!.queue.length || !track) {
      await ctx.reply({
        embeds: [
          client.embed().desc(`${client.emoji.cross} No song in queue at postion ${position + 1}.`),
        ],
      });
      return;
    }

    player!.queue.splice(position, 1);

    await ctx.reply({
      embeds: [client.embed().desc(`${client.emoji.check} Removed ${track.title}.`)],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
