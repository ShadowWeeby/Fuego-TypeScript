/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';
import { updatePlayerButtons } from '../../functions/updatePlayerButtons.js';

export default class Resume extends Command {
  override playing = true;
  override inSameVC = true;
  override description = 'Resume paused player';

  override execute = async (client: ExtendedClient, ctx: Context) => {
    const player = client.getPlayer(ctx);

    if (!player!.paused) {
      await ctx.reply({
        embeds: [
          client
            .embed()
            .desc(`${client.emoji.cross} There currently is no paused player in this guild.`),
        ],
      });
      return;
    }

    player!.pause(false);

    await updatePlayerButtons(client, player!);

    await ctx.reply({
      embeds: [client.embed().desc(`${client.emoji.check} Resumed the player.`)],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
