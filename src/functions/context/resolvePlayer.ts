/**
 * @fuego v1.0.0
 * @author painfuego (www.codes-for.fun)
 * @copyright 2024 1sT - Services | CC BY-NC-SA 4.0
 */

import { Context } from '../../interfaces/context.js';
import { Command } from '../../classes/abstract/command.js';

export const resolvePlayer = async (ctx: Context, command: Command) => {
  const { client } = ctx;

  if (!(command.playing || command.player)) return true;

  const player = client.getPlayer(ctx);

  if (!player) {
    await ctx.reply({
      embeds: [client.embed().desc(`${client.emoji.cross} There is no player for this guild.`)],
    });
    return false;
  }

  if (command.playing && !player.queue.current) {
    await ctx.reply({
      embeds: [
        client.embed().desc(`${client.emoji.cross} There is no playing player for this guild.`),
      ],
    });
    return false;
  }

  return true;
};

/**@codeStyle - https://google.github.io/styleguide/tsguide.html */
