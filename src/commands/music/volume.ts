/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Args } from '../../interfaces/args.js';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command, options } from '../../classes/abstract/command.js';

export default class Volume extends Command {
  override playing = true;
  override inSameVC = true;
  override aliases = ['v', 'vol'];
  override description = 'Adjust player volume';

  override options: options[] = [
    {
      name: 'volume',
      required: false,
      opType: 'string',
      description: 'volume ( 150 > V > 0)',
    },
  ];

  override execute = async (client: ExtendedClient, ctx: Context, args: Args) => {
    const player = client.getPlayer(ctx);

    const volume = Math.ceil(parseInt(args[0])) || player!.volume;

    if (volume > 150 || volume < 1) {
      await ctx.reply({
        embeds: [
          client
            .embed()
            .desc(
              `${client.emoji.cross} Volume must be greater than \`0\` and lesser than \`150\`.`,
            ),
        ],
      });
      return;
    }

    player!.setVolume(volume);
    await ctx.reply({
      embeds: [
        client.embed().desc(`${client.emoji.check} Current volume for player is \`${volume}%\`.`),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
