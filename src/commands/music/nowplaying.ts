/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { User } from 'discord.js';
import { Context } from '../../interfaces/context.js';
import { ExtendedClient } from '../../classes/client.js';
import { Command } from '../../classes/abstract/command.js';

export default class NowPlaying extends Command {
  override playing = true;
  override inSameVC = true;
  override aliases = ['now', 'np'];
  override description = 'Get current song info';

  override execute = async (client: ExtendedClient, ctx: Context) => {
    const track = client.getPlayer(ctx)!.queue.current;

    await ctx.reply({
      embeds: [
        client
          .embed()
          .desc(
            `${client.emoji.check} ${track!.title}\n\n` +
              `${client.emoji.info} Duration: ${track!.isStream ? `◉ LiVE` : client.formatDuration(track!.length!)}\n` +
              `${client.emoji.info} Author: ${track!.author}`,
          )
          .footer({
            text: `Track requested by ${(track!.requester as User).displayName}`,
          }),
      ],
    });
  };
}

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
